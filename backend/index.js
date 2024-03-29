import "dotenv/config";
import express from "express";
import helmetMiddleware from "./middlewares/helmet.js";
import corsMiddleware from "./middlewares/cors.js";
import requestLoggerMiddleware from "./middlewares/requestLogger.js";
import nylasMiddleware from "./middlewares/nylas.js";
import sessionMiddleware from "./middlewares/sessions.js";
import authRouter from "./routes/authRoutes.js";
import emailRouter from "./routes/emailRoutes.js";
import logger from "./services/loggerService.js";

// Start the server
const app = express();
const port = 3000;
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

// Middleware
app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(requestLoggerMiddleware);
app.use(sessionMiddleware);
app.use(express.static("public"));
app.use(nylasMiddleware);

// Routes
app.use("/auth", authRouter);
app.use("/email", emailRouter);
