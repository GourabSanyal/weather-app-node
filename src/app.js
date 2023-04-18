const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

const forcast = require("./utils/forcast");
const geoCode = require("./utils/geoCode");

// defined path for express config
// servers the html files from the location ../public
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "/templates/views");
const partialsPath = path.join(__dirname, "/templates/partials");

// setup handlebars engine and views location
// no routes eg /help, /about is needed as the html is served using __dirname as /about.html & /help.html
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "G",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "G",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "this is the help message",
    name: "G",
  });
});

app.get("/weather", (req, res) => {
  // if address is not there, return an error
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address term",
    });
  }

  // calling geocode & nesting the forcast in it
  geoCode(req.query.address, (error, { lat, long, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }

    forcast(lat, long, (error, forcastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forcast: forcastData,
        location: location,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "G",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "G",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// run - node run start - at web-server>
