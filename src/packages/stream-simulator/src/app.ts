import WebSocket from "ws";
import {WeatherEvent} from "./schema/event.schema";

const PORT = 8765;
const INTERVAL_MS = 100; // ~10 events/second
const cities: { [key: string]: number[] } = {
    Berlin: [52.52, 13.41],
    NewYork: [40.71, -74.01],
    Tokyo: [35.68, 139.69],
    SaoPaulo: [-23.55, -46.63],
    CapeTown: [-33.92, 18.42],
};

const wss = new WebSocket.Server({port: PORT}, () => {
    console.log(`🌍 Weather WebSocket server running at ws://localhost:${PORT}`);
});

wss.on('connection', (ws) => {
    console.log('🟢 Client connected');
    const interval = setInterval(async () => {
        const cityNames = Object.keys(cities);
        const city = cityNames[Math.floor(Math.random() * cityNames.length)];
        const [lat, lon] = cities[city];
        try {
            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=
${lon}&current_weather=true`);
            const data = await response.json();
            const weather = data.current_weather;
            if (weather) {
                const event: WeatherEvent = {
                    city,
                    timestamp: weather.time,
                    temperature: weather.temperature,
                    windspeed: weather.windspeed,
                    winddirection: weather.winddirection,
                };
                ws.send(JSON.stringify(event));
            }
        } catch (err: any) {
            console.error('Error fetching weather data:', err.message);
        }
    }, INTERVAL_MS);
    ws.on('close', () => {
        console.log('🔴 Client disconnected');
        clearInterval(interval);
    });
});
