import express from "express";
import { vibifyEmails } from "../controllers/emailController.js";
import { getGrantId } from "../services/fileStorageService.js";

const router = express.Router();

router.use((req, res, next) => {
  if (!req.nylas) {
    console.error("Nylas not initialized. Redirecting to login.");
    return res.redirect("/auth/nylas");
  }

  next();
});

router.use(async (req, res, next) => {
  if (!req.nylasGrantId) {
    req.nylasGrantId = await getGrantId(1);

    if (!req.nylasGrantId) {
      console.error("Grant ID not found. Redirecting to login.");
      return res.redirect("/auth/nylas");
    }
  }

  next();
});

router.get("/vibify-emails", vibifyEmails);

export default router;
