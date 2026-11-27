// "import type" means "I only need this for type checking,not at runtime"
//My vite template has a setting that REQUIRES thise for type-only imports
//The types vanish when the code is built, so "import type" makes that explicit
import type {City, WeatherResponse} from "../types/weather";


//The function takes a City and returns a Promise
//An async function always returns a Promise and promise<WeatherResponse> means
//"later, this will give you a WeatherResponse" 
export async function fetchWeather(
    city: City,
    signal?: AbortSignal
): Promise<WeatherResponse> {

    //URLSearchParams builds the ?key=value&key=value part safely, so we dont glue strings by hand
    const params = new URLSearchParams({
        latitude: String(city.latitude),  //URL values must be strings, so convert numbers
        longitude: String(city.longitude),
        current:
        "temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code",
        daily: "weather_code,temperature_2m_max,temperature_2m_min",
        forecast: "7",
        timezone: "auto"  //required for daily data, and it makes each "day" match the city's own calender 
    });


    //${params} turns the object into a string like "latitude=52.52&longitude=13.41&current=temperature_2m,..."
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`,
        {signal}
    );

    //fetch does not throw on 404 or 500, so we check the status manually
    if (!response.ok) {
        throw new Error(`Weather request failed with status ${response.status}`);
    }

    //.json() gives the data and the return type tells TypeScript waht shape to expect
    return response.json() ;
}
