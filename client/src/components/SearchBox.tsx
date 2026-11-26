import { useState, useEffect } from "react";
import type { City, GeoCodingResult } from "../types/weather"; 
import { searchCities } from "../api/geocoding";
import { useDebounce } from "../hooks/useDebounce";
import { isAbortError } from "../utils/errors";

//UNION TYPE
//Safer than juggling separate isloading / is Error booleans that could disagree
type SearchStatus = "idle" | "loading" | "success" | "error";

//The parent gives us a function to call when the user picks a city
//(city: City) => void means: takes a City, returns nothing
interface SearchBoxProps {
    onSelect: (city: City) => void;
}

//Turns a result into readable text 
//There are several cities called Paris , so the extra parts tell them apart
function formartPlace(result: GeoCodingResult) :string {
    //filter(Boolean) drops missing (undefined) parts; join(", ") glues the raet together
    return [result.name, result.admin1, result.country].filter(Boolean).join(", ");
}
function SearchBox({onSelect}: SearchBoxProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<GeoCodingResult[]>([]);
    const [status, setStatus] = useState<SearchStatus>("idle");

    const debouncedQuery = useDebounce(query, 400)

    useEffect(() => {
        const trimmed = debouncedQuery.trim(); //remove spaces from both ends

        // too short to search: clear everything and stpo
        if (trimmed.length < 2) {
            setResults([]);
            setStatus("idle");
            return;
        }

        //one Abortcontroller per search. Calling .abort() cancels its request
        const controller = new AbortController();
        setStatus("loading");

        searchCities(trimmed, controller.signal)
        .then((found) => {
            setResults(found);
            setStatus("success");
        })
        .catch((err: unknown) => {
            //A cancelled request is expected, so ignore it silently
            if (isAbortError(err)) return;
            setStatus("error");
        });

        //CLEANUP: if the query changes while a request is still running, cancel the old one
        //This stops a slow, old response from overwriting a newer one ("race condition")
        return () => controller.abort();
    }, [debouncedQuery]);

    //Called when the user clicks a suggestion
    function handlePick(result: GeoCodingResult) {
        //Convert the geocoding result into the smaller City shape our app uses
        onSelect({
            name: result.name,
            latitude: result.latitude,
            longitude: result.longitude
        });
        setQuery("");
        setResults([]);
        setStatus("idle");
    }

    return (
        <div className="search">
            {/*htmlFor links the label to the input, so screen readers announce it and clicking the label focuses the input */}
            <label htmlFor="city-search">Search for a city</label>
            <input
             id="city-search"
             type="search"
             value={query}
             onChange={(e) => setQuery(e.target.value)}
             placeholder="e.g. Lisbon"
             autoComplete="off"
            />

            {/* aria-live tells screen reader to announce changes to this text */}
            <p className="search-status" aria-live="polite">
                {status === "loading" && "Searching..."}
                {status === "error" && "Search failed. Check your connection and try again."}
                {status === "success" && results.length === 0 && "No cities found."}
            </p>

            {results.length > 0 && (
                <ul className="suggestions">
                    {/*key helps React track list items. Use a stable unique id, never the index */}
                    {results.map((r) => (
                    <li key={r.id}>
                        {/*A real <button> works with the keyboard (Tab, Enter) for free */}
                        <button type="button" onClick={() => handlePick(r)}>
                            {formartPlace(r)}
                        </button>
                    </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchBox;
