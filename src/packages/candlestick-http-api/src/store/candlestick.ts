import {Candlestick} from "../schema/api.schema";

// In-memory aggregation: city -> hour -> candlestick
export const store: Record<string, Record<string, Candlestick>> = {};
