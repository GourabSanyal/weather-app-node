// src/utils/geocode.ts
import axios from 'axios';
import { GeoCodeData, MapboxResponse } from '../types';

export const geoCode = async (address: string): Promise<GeoCodeData> => {
  const encodedAddress = encodeURIComponent(address);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=pk.eyJ1IjoiZ291cmFic2FueWFsIiwiYSI6ImNsZXZzbzA2dzF0emgzcnAxenpvYnhyY24ifQ.8sboKAuH3rz6caR6o7gupA&limit=1`;

  try {
    const response = await axios.get<MapboxResponse>(url);
    const { features } = response.data;

    if (features.length === 0) {
      throw new Error('Unable to find location, try with other location');
    }

    return {
      lat: features[0].center[1],
      long: features[0].center[0],
      location: features[0].place_name,
    };
  } catch (error) {
    throw new Error('Unable to connect to location services!');
  }
};