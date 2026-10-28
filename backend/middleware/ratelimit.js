const rateLimit = require("express-rate-limit");
const { RedisStore } = require("rate-limit-redis");
const { redis } = require("../config/redis");

const loginLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    limit: 5, // Maximum 5 requests per IP per minute

    standardHeaders: true,
    legacyHeaders: false,

    store: new RedisStore({
        sendCommand: (...args) => redis.sendCommand(args)
    }),

    message: {
        message: "Too many login attempts. Try again later."
    }
});

module.exports = loginLimiter;