import WebSocket from "ws";
import {validationMiddleware} from "./middleware/validation.middleware";
import {aggregateEvent} from "../utils/aggregateEvent.utils";

const URL = "ws://localhost:8765";

/**
 * WeatherApiWebsocketConnection manages a WebSocket connection for weather events.
 *
 * - Establishes and maintains a WebSocket connection.
 * - Handles connection events (`open`, `message`, `close`, `error`).
 * - Validates and aggregates incoming weather event data.
 */
class WeatherEventConsumer {
    private ws: WebSocket | null = null;
    private reconnectAttempts = 0;
    private readonly maxReconnectDelay = 30000; // 30 seconds

    /**
     * Initializes the WebSocket connection and registers event handlers.
     */
    constructor() {
        this.connect();
    }

    /**
     * Establishes the WebSocket connection and registers event handlers.
     */
    private connect() {
        this.ws = new WebSocket(URL);
        this.registerEvents();
    }

    /**
     * Registers event listeners for the WebSocket connection.
     * Handles `open`, `message`, `close`, and `error` events.
     */
    private registerEvents() {
        if (!this.ws) return;
        this.ws.on("open", this.onOpen);
        this.ws.on("message", this.onMessage);
        this.ws.on("close", this.onClose);
        this.ws.on("error", this.onError);
    }

    /**
     * Called when the WebSocket connection is established.
     */
    private onOpen = () => {
        console.log("Connected to server");
        this.reconnectAttempts = 0; // Reset on successful connection
    };

    /**
     * Handles incoming messages from the WebSocket server.
     * Validates and aggregates weather event data.
     *
     * @param data - The raw data received from the server.
     */
    private onMessage = (data: WebSocket.RawData) => {
        // Parse, validate, and process data
        const event = validationMiddleware(data.toString());
        if (event) {
            aggregateEvent(event);
        }
    };

    /**
     * Called when the WebSocket connection is closed.
     */
    private onClose = () => {
        console.log("Disconnected from server");
        this.retryConnection();
    };

    /**
     * Handles errors from the WebSocket connection.
     *
     * @param err - The error object.
     */
    private onError = (err: any) => {
        console.error("WebSocket error:", err);
        // Close the socket to trigger retry logic if not already closed
        if (this.ws && this.ws.readyState !== WebSocket.CLOSED) {
            this.ws.close();
        }
    };

    /**
     * Implements exponential backoff for reconnection attempts.
     */
    private retryConnection() {
        this.reconnectAttempts += 1;
        const delay = Math.min(1000 * 2 ** this.reconnectAttempts, this.maxReconnectDelay);
        console.log(`Reconnecting in ${delay / 1000}s... (attempt ${this.reconnectAttempts})`);
        setTimeout(() => {
            this.connect();
        }, delay);
    }
}

export default WeatherEventConsumer;