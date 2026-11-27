import type { DayForecast, Unit } from "../types/weather";
import { describeWeather } from "../utils/weatherCodes";
import { formartTemp } from "../utils/temperature";
import { formartWeekday } from "../utils/dates";

interface ForecastListProps {
    days: DayForecast[]; //an array of our reshaped days
    unit: Unit;
}

function ForecastList({days, unit}: ForecastListProps) {
    return(
        //aria-labelledby points to the heading's id, naming this section for screen readers
        <section className="forecast" aria-labelledby="forecast-heading">
            <h2 id="forecast-heading">7-day forecast</h2>
            <ul>
                {/*index is the position in the list: 0 for the first day */}
                {days.map((day, index) => {
                    //Look up the label and emoji for this day's weather code
                    const {emoji, label} = describeWeather(day.weatherCode);
                    return (
                        <li key={day.date}>
                            {/*The first day is today, Otherwise show the weekday name */}
                            <span className="day">{index === 0 ? "Today": formartWeekday(day.date)}</span>
                            {/*role="img" + aria-label gives the emoji a text meaning for screen readers */}
                            <span role="img" aria-label={label}>{emoji}</span>
                            <span className="range">
                                {formartTemp(day.max, unit)} / {formartTemp(day.min, unit)}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}

export default ForecastList;