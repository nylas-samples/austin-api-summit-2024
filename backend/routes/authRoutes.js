import express from "express";
import { getAppDomain } from "../services/domainService.js";

const router = express.Router();

// Route to initialize authentication
router.get("/nylas", (req, res) => {
  console.log("Received request to authenticate with Nylas.");

  const authUrl = req.nylas.auth.urlForOAuth2({
    clientId: req.nylasConfig.clientId,
    redirectUri: req.nylasConfig.callbackUri,
  });

  console.log("Ready to auth with Nylas. Informing client to redirect.");
  res.status(200).json({ redirect: authUrl });
});

router.get("/nylas/callback", async (req, res) => {
  console.log("Received callback from Nylas");

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
    console.log("OAuth2 flow completed successfully for grant ID: " + grantId);

    req.session.nylasGrantId = grantId;

    const appDomain = getAppDomain(res);
    console.log("Redirecting to app domain: " + appDomain);
    res.redirect(appDomain);
  } catch (error) {
    console.error("Error exchanging code for token:", error);
    res.status(200).json({ redirect: "/" });
  }
});

export default router;
