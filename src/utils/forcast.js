const request = require("request");

const forcast = (lat, long, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=32fc9075ab5a3a0dc9d38a66b2febf99&query=" +
    lat +
    "," +
    long +
    "&units=f";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      console.log("Unable to  location services!");
    } else if (body.error) {
      callback("Unable to find location, try with other location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          `. In ${body.location.name}, it is currently ${body.current.temperature} degress out, but feels like ${body.current.feelslike} degress out`
      );
    }
  });
};

module.exports = forcast;
