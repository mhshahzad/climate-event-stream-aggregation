import { Candlestick } from "../../../candlestick-http-api/src/schema/api.schema";

export type CandlestickMap = Record<string, Candlestick>;

export const fetchCandlesticks = async (city: string): Promise<CandlestickMap> => {
    const res = await fetch(`/candlesticks/${city}`);
    return await res.json();
};