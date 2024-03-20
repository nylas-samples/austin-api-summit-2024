import "dotenv/config";
import express from "express";
import corsMiddleware from "./middlewares/cors.js";
import loggerMiddleware from "./middlewares/logger.js";
import nylasMiddleware from "./middlewares/nylas.js";
import sessionMiddleware from "./middlewares/sessions.js";
import authRouter from "./routes/authRoutes.js";
import emailRouter from "./routes/emailRoutes.js";

// Start the server
const app = express();
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Middleware
app.use(corsMiddleware);
app.use(loggerMiddleware);
app.use(sessionMiddleware);
app.use(express.static("public"));
app.use(nylasMiddleware);

// Routes
app.use("/auth", authRouter);
app.use("/email", emailRouter);
