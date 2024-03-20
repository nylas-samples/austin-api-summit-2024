import morgan from "morgan";
import logger from "../services/loggerService.js";

const format = process.env.NODE_ENV === "dev" ? "dev" : "combined";

const requestLogger = morgan(format, {
  stream: {
    write: (message) => {
      logger.info(message.trim());
    },
  },
});

export default requestLogger;
