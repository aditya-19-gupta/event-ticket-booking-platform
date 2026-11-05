const rateLimit = require("express-rate-limit");
const { RedisStore } = require("rate-limit-redis");
const { redis } = require("../config/redis");

function createLimiter() {

    const loginLimiter = rateLimit({
        windowMs: 60 * 1000,
        limit: 5,

        standardHeaders: true,
        legacyHeaders: false,

        store: new RedisStore({
            sendCommand: (...args) => redis.sendCommand(args)
        }),

        message: {
            message: "Too many login attempts. Try again later."
        }
    });

    return loginLimiter;
}

module.exports = createLimiter;