import express from "express";
import {
  authenticateWithNylas,
  nylasCallback,
  logoutFromNylas,
} from "../controllers/authController.js";

const router = express.Router();

router.get("/nylas", authenticateWithNylas);
router.get("/nylas/callback", nylasCallback);
router.get("/nylas/logout", logoutFromNylas);

export default router;
