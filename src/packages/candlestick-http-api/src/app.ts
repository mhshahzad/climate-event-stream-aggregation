import express from "express";
import candlesticksRoute from "./routes/candlesticks.route";
import {CleanupStore} from "../utils/cleanup.middleware.utils";
import WeatherEventConsumer from "./weather-event-consumer/connection";

const app = express();
const PORT = 3000;

// Start periodic cleanup (every 10 minutes)
setInterval(CleanupStore, 10 * 60 * 1000);

// Start consuming weather events
new WeatherEventConsumer();

app.use("/", candlesticksRoute);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
