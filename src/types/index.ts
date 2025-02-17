export interface GeoCodeData {
  lat: number;
  long: number;
  location: string;
}

export interface WeatherStackResponse {
  current: {
    temperature: number;
    feelslike: number;
    weather_descriptions: string[];
  };
  location: {
    name: string;
  };
  error?: {
    message: string;
  };
}

export interface MapboxResponse {
  features: Array<{
    center: number[];
    place_name: string;
  }>;
}