import redis from "redis";
import logger from "./loggerService.js";

async function connectToRedis() {
  const redisClient = redis.createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    },
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
    // TODO: Handle the error; maybe retry logic or an alert
  }
}

export default connectToRedis;
