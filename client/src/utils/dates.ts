//Turns "2026-11-24" into a short weekday name lie "Tue"
export function formartWeekday(isDate: string): string {
    //Why the "T00:00:00Z" and timeZone: "UTC"
    //new Date("2026-11-24") is read as midnight UTC. If we then formatted it in the VIEWER's time xone, someone west of UTC would see the previous day
    // Reading AND formartting both in UTC means the date can never shift

    const date = new Date(`${isDate}T00:00:00Z`);
    return date.toLocaleDateString("en-US", {weekday: "short", timeZone: "UTC"});
}