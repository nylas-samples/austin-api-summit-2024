import redis from "redis";
import logger from "./loggerService.js";

let reconnectAttempts = 0;
const maxReconnectAttempts = 10;
const initialReconnectDelay = 1000;
const maxReconnectDelay = 60000; // 1 min max

async function connectToRedis() {
  const redisClient = redis.createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    },
  });

  const scheduleReconnect = () => {
    const delay = Math.min(
      initialReconnectDelay * 2 ** reconnectAttempts,
      maxReconnectDelay
    );
    reconnectAttempts++;

    if (reconnectAttempts > maxReconnectAttempts) {
      logger.error(
        "Maximum reconnect attempts reached. Giving up on reconnecting to Redis."
      );
      return;
    }

    setTimeout(() => {
      logger.info(
        `Attempting to reconnect to Redis... Attempt ${reconnectAttempts}`
      );
      redisClient.connect().catch((err) => {
        logger.error("Redis reconnection attempt failed:", err);
      });
    }, delay);
  };

  // Handle connection errors gracefully
  redisClient.on("error", (error) => {
    logger.error("Redis error:", error);

    // Handle situations where the Redis host is unreachable
    if (error.code === "EHOSTUNREACH") {
      logger.error(
        "Redis host is unreachable. Check network or Redis server status."
      );
      scheduleReconnect();
      return;
    }

    // Only attempt to reconnect if the client is not already connecting or connected
    if (!redisClient.isOpen) {
      scheduleReconnect();
    }
  });

  try {
    await redisClient.connect();
    logger.info("Connected to Redis successfully");
    reconnectAttempts = 0; // Reset on successful connection

    // Test command to verify the connection
    const pingResponse = await redisClient.ping();
    logger.info(`Redis PING response: ${pingResponse}`);

    return redisClient;
  } catch (error) {
    // Retry for initial connection failure
    logger.error("Failed to connect to Redis:", error);
    scheduleReconnect();
  }
}

export default connectToRedis;
