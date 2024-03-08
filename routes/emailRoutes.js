import express from "express";
import {
  sendEmail,
  summarizeMessages,
} from "../controllers/emailController.js";

const router = express.Router();

router.use((req, res, next) => {
  if (!req.nylas) {
    console.error("Nylas not initialized. Redirecting to login.");
    res.redirect("/auth/nylas");
  }
  if (!req.openAI) {
    console.error("OpenAI not initialized.");
    res.status(500).json({ message: "OpenAI not initialized" });
  }
  next();
});

router.get("/send-email", sendEmail);
router.get("/recent-emails", summarizeMessages);

export default router;
