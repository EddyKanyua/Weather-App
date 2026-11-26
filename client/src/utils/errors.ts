// "err is DOMException" is a TYPE PREDICATE
//It tells Typescript : "if this function returns true , treat err as a DOMException afterwards"
// The function's input is "unknown"  because a caught error can be anything
export function isAbortError(err: unknown): err is DOMException {
    // instanceof checks the kind of object; .name tells us which DOMException it is
    return err instanceof DOMException && err.name === "AbortError";
}