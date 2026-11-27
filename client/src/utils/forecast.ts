//Reshapes paallel arrays into one object per day
import type { DailyWeather, DayForecast } from "../types/weather";

//.map loops over the dates; "i" is the position (0, 1, 2..) in that array
// We use the same position to pick the matching value from other arrays
export function toDayForecasts(daily: DailyWeather): DayForecast[] {

    return daily.time.map((date, i) => ({
        date,
        weatherCode: daily.weather_code[i],
        max: daily.temperature_2m_max[i],
        min: daily.temperature_2m_min[i],
    }));
}