import { Request, Response, NextFunction } from "express";
import * as CONFIG from "../../config/api.config.json";
const ipHits: Record<string, { count: number; start: number }> = {};

// --- Rate Limiting Middleware ---
export const rateLimitMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || ""; // Ensure ip is not undefined
    const now = Date.now();
    if (!ipHits[ip] || now - ipHits[ip].start > CONFIG.RATE_LIMIT_WINDOW) {
        ipHits[ip] = { count: 1, start: now };
    } else {
        ipHits[ip].count++;
    }
    if (ipHits[ip].count > CONFIG.RATE_LIMIT_MAX) {
        res.status(429).json({ error: "Too many requests, please try again later." });
    }
    next();
};