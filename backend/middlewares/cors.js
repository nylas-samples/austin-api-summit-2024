import cors from "cors";
import logger from "../services/loggerService.js";

const corsOptions = {
  credentials: true,
};

if (process.env.CORS_ORIGIN) {
  corsOptions.origin = process.env.CORS_ORIGIN;
} else {
  logger.warn("CORS_ORIGIN is not set. This might lead to CORS issues.");
}

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
