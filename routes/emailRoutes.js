import express from "express";
import { sendEmail, getRecentEmails } from "../controllers/emailController.js";

const router = express.Router();

router.get("/send-email", sendEmail);
router.get("/recent-emails", getRecentEmails);

export default router;
