import express from "express";
import { getCookieName } from "../middlewares/sessions.js";
import { getAppDomain } from "../services/domainService.js";
import logger from "../services/loggerService.js";

const router = express.Router();

// TODO: Move controller logic to separate file

// Route to initialize authentication
router.get("/nylas", (req, res) => {
  logger.info("Received request to authenticate with Nylas.");

  const authUrl = req.nylas.auth.urlForOAuth2({
    clientId: req.nylasConfig.clientId,
    redirectUri: req.nylasConfig.callbackUri,
  });

  logger.info("Ready to auth with Nylas. Informing client to redirect.");
  res.status(200).json({ redirect: authUrl });
});

router.get("/nylas/callback", async (req, res) => {
  logger.info("Received callback from Nylas");

  const code = req.query.code;

  if (!code) {
    // TODO: Send redirect object to client to redirect to home page
    res.status(400).send("No authorization code returned from Nylas");
    return;
  }

  const codeExchangePayload = {
    clientSecret: req.nylasConfig.apiKey,
    clientId: req.nylasConfig.clientId,
    redirectUri: req.nylasConfig.callbackUri,
    code,
  };

  try {
    const response = await req.nylas.auth.exchangeCodeForToken(
      codeExchangePayload
    );
    const { grantId } = response;
    logger.info("OAuth2 flow completed successfully for grant ID: " + grantId);

    req.session.nylasGrantId = grantId;

    const appDomain = getAppDomain(res);
    logger.info("Redirecting to app domain: " + appDomain);
    res.redirect(appDomain);
  } catch (error) {
    logger.error("Error exchanging code for token:", error);
    res.status(200).json({ redirect: "/" });
  }
});

router.get("/nylas/logout", (req, res) => {
  const cookieName = getCookieName();

  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).send("Could not log out.");
    }

    res.clearCookie(cookieName, { path: "/" });
    logger.info(cookieName + " cookie cleared.");

    res.send("Logged out successfully.");
  });
});

export default router;
