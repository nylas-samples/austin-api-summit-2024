import express from "express";
const router = express.Router();

// Route to initialize authentication
router.get("/nylas", (req, res) => {
  const authUrl = req.nylas.auth.urlForOAuth2({
    clientId: req.nylasConfig.clientId,
    redirectUri: req.nylasConfig.callbackUri,
  });

  res.redirect(authUrl);
});

// TODO: redirect on success/fail
router.get("/nylas/callback", async (req, res) => {
  console.log("Received callback from Nylas");
  const code = req.query.code;

  if (!code) {
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

    // NB: This stores in RAM
    // In a real app you would store this in a database, associated with a user
    process.env.USER_GRANT_ID = grantId;

    res.json({
      message: "OAuth2 flow completed successfully for grant ID: " + grantId,
    });
  } catch (error) {
    console.error("Error exchanging code for token:", error);
    res.status(500).send("Failed to exchange authorization code for token");
  }
});

export default router;
