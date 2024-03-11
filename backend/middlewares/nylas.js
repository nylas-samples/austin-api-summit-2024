import Nylas from "nylas";

const nylasConfig = {
  clientId: process.env.NYLAS_CLIENT_ID,
  callbackUri: "http://localhost:3000/auth/nylas/callback",
  apiKey: process.env.NYLAS_API_KEY,
  apiUri: process.env.NYLAS_API_URI,
};

const nylas = new Nylas({
  apiKey: nylasConfig.apiKey,
  apiUri: nylasConfig.apiUri, // "https://api.us.nylas.com" or "https://api.eu.nylas.com"
});

const nylasMiddleware = (req, res, next) => {
  req.nylas = nylas;
  req.nylasConfig = nylasConfig;
  next();
};

export default nylasMiddleware;
