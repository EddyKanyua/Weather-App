import type { Unit } from "../types/weather";

const STORAGE_KEY = "weather-unit"; //the name we save the value under

//TYPE GUARD: "value is Unit" tells TypeScript that when this returns true,
// the value is definitely a Unit. Without it, TypeScript only knows it is a string
function isUnit(value: string | null): value is Unit {
    return value === "celsius" || value === "fahrenheit";
}

export function loadUnit(): Unit {
    //try/catch because localStorage can throw (private browsing, blocked storage)
    try {
        const saved = localStorage.getItem(STORAGE_KEY); //returns a string, or null if nothing saved
        //Never trust storage: anyone can edit it. If the saved value isn't valid, use the default
        return isUnit(saved) ? saved : "celsius";
    } catch {
        return "celsius";
    }
}

export function saveUnit(unit: Unit): void {
    try {
        localStorage.setItem(STORAGE_KEY, unit);
    } catch {
        //Saving is a nicety, not essential, so ignore failures
    }
}