import session from "express-session";

function createSessionMiddleware() {
  const sessionConfig = {
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: false,
    cookie: {
      secure: process.env.NODE_ENV === "prod",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      domain: process.env.NODE_ENV === "dev" ? "localhost" : undefined,
    },
  };

  return session(sessionConfig);
}

const sessionMiddleware = createSessionMiddleware();

export const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.nylasGrantId) {
    console.log("User is authenticated.");
    next();
  } else {
    console.error("User is not authenticated. Redirecting to login.");
    return res.redirect("/auth/nylas");
  }
};

export default sessionMiddleware;
