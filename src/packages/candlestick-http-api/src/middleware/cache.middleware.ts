import { Request, Response, NextFunction } from "express";
import * as CONFIG from "../../config/cache.config.json"

const cache: Record<string, { data: any; ts: number }> = {};

// --- Simple In-Memory Cache Middleware ---
export const cacheMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const key = req.originalUrl;
    const cached = cache[key];
    if (cached && Date.now() - cached.ts < CONFIG.CACHE_LIMIT_WINDOW) {
        res.json(cached.data);
    }
    // Monkey-patch res.json to cache the response
    const origJson = res.json.bind(res);
    res.json = (body) => {
        cache[key] = { data: body, ts: Date.now() };
        return origJson(body);
    };
    next();
}
