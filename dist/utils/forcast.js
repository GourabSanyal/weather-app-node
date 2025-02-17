"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forecast = void 0;
const axios_1 = __importDefault(require("axios"));
const forecast = async (lat, long) => {
    const url = `http://api.weatherstack.com/current?access_key=32fc9075ab5a3a0dc9d38a66b2febf99&query=${lat},${long}&units=f`;
    try {
        const response = await axios_1.default.get(url);
        const body = response.data;
        if (body.error) {
            throw new Error('Unable to find location, try with other location');
        }
        return `${body.current.weather_descriptions[0]}. In ${body.location.name}, it is currently ${body.current.temperature} degrees out, but feels like ${body.current.feelslike} degrees out`;
    }
    catch (error) {
        throw new Error('Unable to connect to weather service!');
    }
};
exports.forecast = forecast;
