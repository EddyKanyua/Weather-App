export interface City {
    name: string;
    latitude: number;
    longitude: number;
}
export interface CurrentWeather {
    time: string;   
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    weather_code: number;
}
export interface WeatherResponse {
    latitude: number;
    longitude: number;
    current: CurrentWeather;
}
export interface GeoCodingResult {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    country?: string;
    admin1?: string;
}

export interface GeoCodingResponse {
    results?: GeoCodingResult[];
}