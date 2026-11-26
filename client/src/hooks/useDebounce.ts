import { useEffect, useState } from "react";

// <T> is a GENERIC: a placeholder for "whatever you give me"
// if you pass a string, T becomes a string and the hook returns a string
// If you pass a number, it returns a number. one function, any type ,still fully checked
// "delay = 400" is a default value : if you dont pass one , it waits 400 ms
export function useDebounce<T>(value: T, delay = 400): T {
    //Holds the "settled" value, starting equal to the live value
    const[debounced, setDebounced] = useState<T>(value);

    useEffect(() => {
        // Start a timer: after "delay" ms, copy the live value into the settled one
        const timer = setTimeout(() => setDebounced(value), delay);

        //CLEANUP: React runs this before the effect runs again (and whhen the component leaves)
        // If the user types again before the timer fires, we cancel the old timer
        return () => clearTimeout(timer);
    }, [value, delay]); //re-run whenever the  value or delay changes

    return debounced;
}