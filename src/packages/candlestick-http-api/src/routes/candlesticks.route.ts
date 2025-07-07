import {Router} from "express";
import {store} from "../store/candlestick";
import {cacheMiddleware} from "../middleware/cache.middleware";
import {rateLimitMiddleware} from "../middleware/rateLimit.middleware";
import {CandlestickResponse} from "../schema/api.schema";
import {validationMiddleware} from "../middleware/validation.middleware";

const router = Router();

router.get(
    "/candlesticks/:city",
    rateLimitMiddleware,
    cacheMiddleware,
    validationMiddleware,
    // authMiddleware // check for authorization header / parse user identity and/or scope
    (req, res) => {
        const city = req.params.city;
        const data = store[city] || {};
        res.json(data as CandlestickResponse);
    }
);

export default router;
