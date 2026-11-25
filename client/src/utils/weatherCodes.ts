//what we show for each weather code
export interface WeatherDescription {
    label: string; 
    emoji: string;
}

//record<number, WeatherDescription> means:
//"an object whose keys are numbers and whose values are WeatherDescription objects"
//It is a typed lookup table
const WEATHER_CODES: Record<number, WeatherDescription> = {
    0: { label: "Clear sky", emoji: "☀️" },
    1: { label: "Mainly clear", emoji: "🌤️" },
    2: { label: "Partly cloudy", emoji: "⛅" },
    3: { label: "Overcast", emoji: "☁️" },
    45: { label: "Fog", emoji: "🌫️" },
    48: { label: "Depositing rime fog", emoji: "🧊" },
    51: { label: "Light drizzle", emoji: "🌦️" },
    53: { label: "Moderate drizzle", emoji: "🌦️" },
    55: { label: "Dense drizzle", emoji: "🌦️" },
    61: { label: "Light freezing drizzle", emoji: "🌧️" },
    63: { label: "Moderate rain", emoji: "🌧️" },
    65: { label: "Heavy freezing drizzle", emoji: "🌧️" },
    71: { label: "Slight snow fall", emoji: "🌨️" },
    73: { label: "Moderate snow fall", emoji: "🌨️" }, 
    75: { label: "Heavy snow fall", emoji: "🌨️" }, 
    80: { label: "Rain showers", emoji: "⛈️" },
    81: { label: "Heavy rain showers", emoji: "🌦️" },
    82: { label: "Violent rainshowers", emoji: "🌦️" },
    95: { label: "Thunderstorm", emoji: "⛈️" },
    96: { label: "Thunderstorm with hail", emoji: "⛈️" },
    99: { label: "Thunderstorm with heavy hail", emoji: "⛈️" }
}; 

//Takes a code, returns a WeatherDescription object with a label and emoji
//If we have no description for the code, we return a fallback "??" meaning "if the left side is null or undefined, use the right side instead"
export function describeWeather(code: number): WeatherDescription {
    return WEATHER_CODES[code]  ?? { label: "Unknown", emoji: "❓" };
    
}   