import { CalendarEvent } from "./types";

const kv = await Deno.openKv();

export async function saveEvent(event: CalendarEvent): Promise<void> {
    const dateKey = event.startDate.split("T")[0];

    // Atomic transaction to save event and index by date
    await kv.atomic()
        .set(["events", event.id], event)
        .set(["events_by_date", dateKey, event.id], event)
        .commit();
}

export async function getEventsByDateRange(startDateISO: string, endDateISO: string): Promise<CalendarEvent[]> {
    const events: CalendarEvent[] = [];
    const startDay = startDateISO.split("T")[0];
    const endDay = endDateISO.split("T")[0];

    const iter = kv.list<CalendarEvent>({
        start: ["events_by_date", startDay],
        end: ["events_by_date", endDay + "\xFF"],
    });

    for await (const res of iter) {
        events.push(res.value);
    }

    return events;
};

export async function deleteEvent(id: string, startDateISO: string): Promise<void> {
    const dateKey = startDateISO.split("T")[0];
    await kv.atomic()
        .delete(["events", id])
        .delete(["events_by_date", dateKey, id])
        .commit();
};