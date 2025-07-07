import * as CONFIG from "../config/store.config.json"
import {store} from "../src/store/candlestick";

/**
 * Cleans up the candlestick store by removing outdated candlesticks and empty city entries.
 *
 * The function iterates through the `store` object, which contains candlestick data grouped by city.
 * It removes candlesticks that have an end time (`to` field) older than the cutoff time, calculated
 * based on the current time minus the retention period defined in the configuration.
 *
 * If a city has no remaining candlesticks after cleanup, the city entry is also removed from the store.
 *
 * Configuration:
 * - `CONFIG.CANDLESTICK_RETENTION_HOURS`: The retention period in hours for candlesticks.
 *
 * Dependencies:
 * - `store`: The global object containing candlestick data.
 */
export const CleanupStore = () => {
    const now = Date.now(); // Get the current timestamp
    const cutoff = now - CONFIG.CANDLESTICK_RETENTION_HOURS; // Calculate the cutoff time for retention

    // Iterate through each city in the store
    Object.keys(store).forEach(city => {
        // Iterate through each candlestick in the city's data
        Object.entries(store[city]).forEach(([hourKey, candle]) => {
            // Parse the 'to' field to get the end time of the candlestick
            const candleEnd = Date.parse(candle.to);
            // Remove the candlestick if its end time is older than the cutoff
            if (candleEnd < cutoff) {
                delete store[city][hourKey];
            }
        });

        // Remove the city entry if no candlesticks remain
        if (Object.keys(store[city]).length === 0) {
            delete store[city];
        }
    });
}