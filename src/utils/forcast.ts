import axios from 'axios';
import { WeatherStackResponse } from '../types';

export const forecast = async (lat: number, long: number): Promise<string> => {
  const url = `http://api.weatherstack.com/current?access_key=32fc9075ab5a3a0dc9d38a66b2febf99&query=${lat},${long}&units=f`;
  
  try {
    const response = await axios.get<WeatherStackResponse>(url);
    const body = response.data;

    if (body.error) {
      throw new Error('Unable to find location, try with other location');
    }

    return `${body.current.weather_descriptions[0]}. In ${body.location.name}, it is currently ${body.current.temperature} degrees out, but feels like ${body.current.feelslike} degrees out`;
  } catch (error) {
    throw new Error('Unable to connect to weather service!');
  }
};