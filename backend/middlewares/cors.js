import cors from "cors";

const corsOptions = {
  credentials: true,
};

if (process.env.CORS_ORIGIN) {
  corsOptions.origin = process.env.CORS_ORIGIN;
} else {
  console.warn("CORS_ORIGIN is not set. This might lead to CORS issues.");
}

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
