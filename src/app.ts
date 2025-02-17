
import { Response, Request, RequestHandler } from "express";
const express = require("express");
const path = require("path");
const hbs = require("hbs");
import { forecast } from "./utils/forcast";
import { geoCode } from "./utils/geoCode";

// import { ErrorData } from "./types";

// const path = require("path");
// const express = require("express");
// const hbs = require("hbs");

interface WeatherQuery {
  address?: string;
}

interface WeatherErrorResponse {
  error: string;
}

interface WeatherSuccessResponse {
  forecast: string;
  location: string;
  address: string;
}

type WeatherResponse = WeatherErrorResponse | WeatherSuccessResponse;

interface ProductsQuery {
  search?: string;
}

interface ProductsResponse {
  error?: string;
  products?: any[];
}

const app = express();

// const forcast = require("./utils/forcast");
// const geoCode = require("./utils/geoCode");

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

app.get("", (req : Request, res: Response) => {
  res.render("index", {
    title: "Weather App",
    name: "G",
  });
});

app.get("/about", (req : Request, res: Response) => {
  res.render("about", {
    title: "About Me",
    name: "G",
  });
});

app.get("/help", (req : Request, res: Response) => {
  res.render("help", {
    title: "Help",
    helpText: "this is the help message",
    name: "G",
  });
});

app.get("/weather", (async (req: Request<{}, WeatherResponse, {}, WeatherQuery>, res: Response<WeatherResponse>) => {
  if (!req.query.address) {
    res.send({
      error: "You must provide an address term",
    });
    return;
  }

  try {
    const geoData = await geoCode(req.query.address as string);
    const forecastData = await forecast(geoData.lat, geoData.long);
    
    res.send({
      forecast: forecastData,
      location: geoData.location,
      address: req.query.address,
    });
    return
  } catch (error) {
    res.send({
      error: error instanceof Error ? error.message : 'An error occurred',
    });
    return
  }
}) as RequestHandler);

app.get("/products", (async (req: Request<{}, ProductsResponse, {}, ProductsQuery>, res: Response<ProductsResponse>) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
    return
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
  return
}) as RequestHandler);

app.get("/help/*", (req: Request, res: Response) => {
  res.render("404", {
    title: "404",
    name: "G",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req: Request, res: Response) => {
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
