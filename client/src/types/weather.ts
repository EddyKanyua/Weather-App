//export lets other files import these types
//The shape of one city we want weather for

export interface City {
    name: string;
    latitude: number;
    longitude: number;
}

//The "current" objects from the Open-Meteo API
export interface CurrentWeather {
    time: string;   
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    weather_code: number;
}

//The whole response .We only list the parts we use
export interface WeatherResponse {
    latitude: number;
    longitude: number;
    current: CurrentWeather;
}