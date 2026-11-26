

import type { GeoCodingResult, GeoCodingResponse } from  "../types/weather";

//"signal" is optional (?). It lets the caller cancel the request halfway
//AbortSignal is the built-in browser type
export async function searchCities(
    query:string,
    signal?: AbortSignal,
): Promise<GeoCodingResult[]> {


    //name = what the user typed. count = max results , language= names in engilsh
    const params = new URLSearchParams({
        name: query,
        count: "5",
        language: "en"
    });


    //Passing {signal} to fetch connects it to the cancel switch
    const response = await fetch (
        `https://geocoding-api.open-meteo.com/v1/search?${params}`,
        {signal}
    );

    if(!response.ok) {
        throw new Error(`City search failed (status ${response.status})`);
    }

    const data: GeoCodingResponse = await response.json();

    //with zero matches , "results" does not exist, so we fall back to an empty list
    //"??" means use the right side isf the left is null or undefined
    return data.results ?? [];
    
}