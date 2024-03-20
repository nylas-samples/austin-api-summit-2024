import winston from "winston";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the /data directory exists
const dataDir = path.join(__dirname, "..", "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Write logs to a file
const transports = [
  new winston.transports.File({ filename: path.join(dataDir, "access.log") }),
];

// Add the console transport only in dev env
if (process.env.NODE_ENV === "dev") {
  transports.push(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: transports,
});

export default logger;
