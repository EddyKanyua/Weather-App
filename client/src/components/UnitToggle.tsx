import type { Unit } from "../types/weather";

interface UnitToggleProps {
    unit: Unit;                      //which one is currently selected
    onChange: (unit: Unit) => void; //called when the user clicks the other one
}

// A list of both options so we can loop instead of writing two buttons by hand
const UNITS: Unit[] = ["celsius", "fahrenheit"];

function UnitToggle({unit, onChange}: UnitToggleProps) {
    return (
        // role="group" + aria-label lets screen readers announce "Temperature unit, group"
        <div className="unit-toggle" role="group" aria-label="Temperature unit">
            {UNITS.map((u) => (
                <button
                   key={u}
                   type="button"
                   aria-pressed={u === unit} // tells assistive tech which button is "on"; we also style with it
                   onClick={() => onChange(u)}
                >
                    {u === "celsius" ? "°C" : "°F"}
                </button>
            ))}
        </div>
    );
}

export default UnitToggle;