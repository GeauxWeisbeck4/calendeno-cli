export type Priority = "low" | "medium" | "high" | "urgent";

export interface Subtask {
    id: string;
    title: string;
    completed: boolean;
}

export interface CalendarEvent {
    id: string;
    title: string;
    startDate: string;  // ISO String: "2026-10-21T09:00:00.000Z"
    endDate: string;  // ISO String: "2026-10-21T09:00:00.000Z"
    description?: string;  // Markdown supported text
    text?: string;  // Markdown supported text
    priority: Priority;
    subtasks: Subtask[];
    createdAt: string;
}

// Key structure in Deno KV:
// ["events_by_date", "YYYY-MM-DD", eventId] -> CalendarEvent
// ["events", eventId] -> CalendarEvent