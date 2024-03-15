import express from "express";
import { saveGrantId } from "../services/fileStorageService.js";

const router = express.Router();

// Route to initialize authentication
router.get("/nylas", (req, res) => {
  console.log("Received request to authenticate with Nylas. Redirecting...");

  const authUrl = req.nylas.auth.urlForOAuth2({
    clientId: req.nylasConfig.clientId,
    redirectUri: req.nylasConfig.callbackUri,
  });

  console.log("Ready to auth with Nylas. Informing client to redirect.");
  return res.status(200).json({ redirect: authUrl });
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

    // NB: This stores in your file system. Don't do this in a real app!
    // In a real app you would store this in a database, associated with a user
    await saveGrantId(1, grantId); // Save the grant ID for lookup later
    req.nylasGrantId = grantId; // Add the grant ID to request object for use now

    console.log("OAuth2 flow completed successfully for grant ID: " + grantId);

    return res.redirect("http://localhost:3001/");
  } catch (error) {
    console.error("Error exchanging code for token:", error);
    res.redirect("/auth/nylas");
  }
});

export default router;
