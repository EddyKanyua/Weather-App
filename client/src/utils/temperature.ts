import type { Unit } from "../types/weather";

//Celsius to fahrenheit Formula: multiply by 9/5 then add 32
//If the unit is celcius, there is nothing to convert, so return it untouched

export function convertTemp(celsius: number, unit: Unit): number {
    return unit === "celsius" ? celsius : (celsius * 9) / 5 + 32;

}

//Converts, rounds and adds the unit symbol: 
export function formartTemp(celsius: number, unit: Unit): string {
    const value = Math.round(convertTemp(celsius, unit));
    const symbol = unit === "celsius" ? "C" : "F";
    return `${value}°${symbol}`;
}