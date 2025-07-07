import {WeatherEvent, WeatherEventSchema} from "stream-simulator/src/schema/event.schema";

/**
 * Validates and parses incoming WeatherEvent data.
 *
 * @param {unknown} data - The data to validate, which can be a JSON string or an object.
 * @returns {WeatherEvent | null} - Returns a valid WeatherEvent object if validation succeeds, otherwise null.
 *
 * This function attempts to parse the input data (if it's a string) and validate it
 * against the WeatherEventSchema. If validation fails or parsing throws an error,
 * it logs a warning and returns null.
 */
export const validationMiddleware = (data: unknown): WeatherEvent | null => {
    try {
        const event = typeof data === "string" ? JSON.parse(data) : data;
        const parsed = WeatherEventSchema.safeParse(event);
        if (!parsed.success) {
            console.warn("Invalid WeatherEvent received:", parsed.error);
            return null;
        }
        return parsed.data;
    } catch (err) {
        console.warn("Failed to parse event from WebSocket:", err);
        return null;
    }
}