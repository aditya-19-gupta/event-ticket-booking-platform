const { createClient } = require("redis");

const redis = createClient({
    url: "redis://127.0.0.1:6379"
});

redis.on("error", (err) => {
    console.error("Redis Error:", err);
});

async function connectRedis() {
    if (!redis.isOpen) {
        await redis.connect();
        console.log("Redis connected successfully");
    }
}

module.exports = { redis, connectRedis };