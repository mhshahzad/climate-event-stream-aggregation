import { z } from "zod";

// Zod schema for a single candlestick
export const CandlestickSchema = z.object({
    open: z.number(),
    close: z.number(),
    min: z.number(),
    max: z.number(),
    from: z.string(),
    to: z.string()
});


// Zod schema for the API response: record of hour -> candlestick
export const CandlestickResponseSchema = z.record(CandlestickSchema);

// Zod schema for validating city parameter (letters, spaces, hyphens, min 1 char)
export const CandlestickRequestSchema = z.object({
    city: z.string().min(1).regex(/^[a-zA-Z\s-]+$/, "Invalid city format")
});

export type Candlestick = z.infer<typeof CandlestickSchema>;
export type CandlestickResponse = z.infer<typeof CandlestickResponseSchema>;
export type CandlestickRequest = z.infer<typeof CandlestickRequestSchema>;
