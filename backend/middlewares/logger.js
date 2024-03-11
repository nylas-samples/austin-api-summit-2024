import fs from "fs";
import morgan from "morgan";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the /data directory exists
const dataDir = path.join(__dirname, "..", "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Create a write stream in append mode for logging to a file
const accessLogStream = fs.createWriteStream(path.join(dataDir, "access.log"), {
  flags: "a",
});

// Setup the logger to log in 'combined' format to the file
const fileLogger = morgan("combined", { stream: accessLogStream });

// Setup the logger to log in 'dev' format to the console
const consoleLogger = morgan("dev");

const loggerMiddleware = (req, res, next) => {
  fileLogger(req, res, () => {}); // Log to file, do not wait to complete
  consoleLogger(req, res, next); // Log to console and proceed with request
};

export default loggerMiddleware;
