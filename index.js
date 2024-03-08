import "dotenv/config";
import express from "express";
import authRouter from "./routes/authRoutes.js";
import emailRouter from "./routes/emailRoutes.js";
import nylasMiddleware from "./middlewares/nylas.js";
import openAIMiddleware from "./middlewares/openAI.js";

// Start the server
const app = express();
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Middleware
app.use(express.static("public"));
app.use(nylasMiddleware);
app.use(openAIMiddleware);

// Routes
app.use("/auth", authRouter);
app.use("/email", emailRouter);

app.get("/", async (req, res) => {
  res.redirect("/auth/nylas");
});
