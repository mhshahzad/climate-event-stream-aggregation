import { z } from "zod";

export const WeatherEventSchema = z.object({
    city: z.string(),
    timestamp: z.string(),
    temperature: z.number(),
    windspeed: z.number(),
    winddirection: z.number(),
});

export type WeatherEvent = z.infer<typeof WeatherEventSchema>;