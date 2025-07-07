import { WeatherEvent } from "stream-simulator/src/schema/event.schema";
import {store} from "../store/candlestick";

export const aggregateEvent = (event: WeatherEvent)=> {
    // Assumes event is already validated
    const date = new Date(event.timestamp);
    const hourKey = `${event.city}-${date.getUTCDay()}-${date.getUTCHours()}`;

    store[event.city] ??= {};

    let c = store[event.city][hourKey];
    if (!c) {
        const hour = date.getUTCHours().toString().padStart(2, '0');
        const day = date.toISOString().slice(0, 10);
        c = {
            open: event.temperature,
            close: event.temperature,
            min: event.temperature,
            max: event.temperature,
            from: `${day}T${hour}:00:00Z`,
            to: `${day}T${hour}:59:59Z`
        };
        store[event.city][hourKey] = c;
    } else {
        c.close = event.temperature;
        c.min = Math.min(c.min, event.temperature);
        c.max = Math.max(c.max, event.temperature);
    }
}