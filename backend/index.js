import "dotenv/config";
import express from "express";
import cors from "cors";
import loggerMiddleware from "./middlewares/logger.js";
import authRouter from "./routes/authRoutes.js";
import emailRouter from "./routes/emailRoutes.js";
import nylasMiddleware from "./middlewares/nylas.js";

// Start the server
const app = express();
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Middleware
app.use(cors());
app.use(loggerMiddleware);
app.use(express.static("public"));
app.use(nylasMiddleware);

// Routes
app.use("/auth", authRouter);
app.use("/email", emailRouter);

app.get("/", async (req, res) => {
  res.redirect("/auth/nylas");
});
