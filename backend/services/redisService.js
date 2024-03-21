import redis from "redis";
import logger from "./loggerService.js";

// TODO: Add exponential backoff for reconnect attempts
const reconnectDelay = 5000;

async function connectToRedis() {
  const redisClient = redis.createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    },
  });

  // Handle connection errors gracefully
  redisClient.on("error", (error) => {
    logger.error("Redis error:", error);

    // Wait for a specified delay and then try to reconnect
    setTimeout(() => {
      logger.info(`Attempting to reconnect to Redis...`);
      redisClient.connect().catch((err) => {
        logger.error("Redis reconnection attempt failed:", err);
      });
    }, reconnectDelay);
  });

  try {
    await redisClient.connect();
    logger.info("Connected to Redis successfully");

    // Test command to verify the connection
    const pingResponse = await redisClient.ping();
    logger.info(`Redis PING response: ${pingResponse}`);

    return redisClient;
  } catch (error) {
    logger.error("Failed to connect to Redis:", error);

    // Retry logic for initial connection failure
    setTimeout(async () => {
      logger.info("Retrying to connect to Redis...");
      try {
        await redisClient.connect();
        logger.info("Reconnected to Redis successfully");
      } catch (retryError) {
        logger.error("Failed to reconnect to Redis:", retryError);
      }
    }, reconnectDelay);
  }
}

export default connectToRedis;
