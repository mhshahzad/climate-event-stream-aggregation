import {CandlestickMap} from "../api/fetchCandlestickData";

export const prepareChartData = (candlesticks: CandlestickMap) => {
    const labels: string[] = [];
    const open: number[] = [];
    const high: number[] = [];
    const low: number[] = [];
    const close: number[] = [];
    Object.entries(candlesticks)
        .sort(([a], [b]) => a.localeCompare(b))
        .forEach(([hour, c]) => {
            labels.push(hour);
            open.push(c.open);
            high.push(c.max);
            low.push(c.min);
            close.push(c.close);
        });
    return { labels, open, high, low, close };
};