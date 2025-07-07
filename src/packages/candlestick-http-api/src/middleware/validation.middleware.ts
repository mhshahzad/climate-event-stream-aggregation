import { Request, Response, NextFunction } from "express";
import { CandlestickRequestSchema } from "../schema/api.schema";

// --- Validation Middleware ---
export const validationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const result = CandlestickRequestSchema.safeParse({ city: req.params.city });
    if (!result.success) {
      res.status(400).json({ error: "Invalid city parameter", details: result.error.errors });
    }
    next();
}

