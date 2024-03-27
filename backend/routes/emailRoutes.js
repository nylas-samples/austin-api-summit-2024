import { Router } from "express";
import { isAuthenticated } from "../middlewares/sessions.js";
import { vibifyEmails } from "../controllers/emailController.js";

const router = Router();

router.get("/vibify-emails", isAuthenticated, vibifyEmails);

export default router;
