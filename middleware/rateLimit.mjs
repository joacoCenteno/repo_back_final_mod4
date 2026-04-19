import {rateLimit, ipKeyGenerator} from "express-rate-limit";

export const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200
})

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,

    handler: (req, res) => {
        const seconds = Math.ceil(
        (req.rateLimit.resetTime - Date.now()) / 1000
        );

        res.set('Retry-After', seconds);

        res.status(429).json({
            message: "Demasiados intentos",
            retryAfter: seconds
        });
    }
})

export const registerLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 3,
    standardHeaders: true,
    legacyHeaders: false,

    handler: (req, res) => {
        const seconds = Math.ceil(
        (req.rateLimit.resetTime - Date.now()) / 1000
        );

        res.set('Retry-After', seconds);

        res.status(429).json({
            message: "Demasiados intentos",
            retryAfter: seconds
        });
    }
});

export const readLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 100,
    keyGenerator: (req) => req.user?.id || ipKeyGenerator(req)
})

export const writeLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 20,
    keyGenerator: (req) => req.user?.id || ipKeyGenerator(req)
})