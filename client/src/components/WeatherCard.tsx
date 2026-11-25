
import type {City, CurrentWeather, } from "../types/weather";
import {describeWeather} from "../utils/weatherCodes";


//PROPS = the onputs a component receives from its parent
//this interface is the contract: whoever uses <WeatherCard /> MUST pass these two
interface WeatherCardProps {
    city: City;
    current: CurrentWeather;
}

//({city, current}: WeatherCardprops) does two things at once:
// 1 {city, current} pulls these two values out of the props object (destructuring)
// 2 : WeatherCardProps tells TypeScript what the props object must look like

function WeatherCard({city, current}: WeatherCardProps) {
    //Turn the numeric weather code into a label and an emoji
    const {label, emoji} = describeWeather(current.weather_code);

    return (
        //classname ( not "class") is how react sets CSS classes
        <section className="card">
            <h2>{city.name}</h2>

            {/*Curly braces insert JavaScript values into the markup */}
            <p className="emoji">{emoji}</p>

            {/*Math.round removes the decimals: 21.5 becomes 22 */}
            <p className="temp">{Math.round(current.temperature_2m)}°C</p>
            <p>{label}</p>

            <ul className="details">
                <li>Feels like {Math.round(current.apparent_temperature)}°C</li>
                <li>Humidity: {current.relative_humidity_2m}%</li>
                <li>Wind Speed: {current.wind_speed_10m} km/h</li>
            </ul>

            {/*The time looks like "2026-11-23T15:00" slice(11, 16) keeps characters 11 to 15, which is "15:00" */}
            <small>Updated at {current.time.slice(11, 16)} (local time)</small>
        </section>
    );
}

//"export default" lets the importing file choose any name for it
export default WeatherCard;