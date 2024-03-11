import { log } from "console";
import { promises as fs } from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");
const filePath = path.join(dataDir, "grantIds.json");

const ensureDataDirectoryExists = async () => {
  try {
    await fs.access(dataDir);
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.mkdir(dataDir);
    } else {
      throw error;
    }
  }
};

const readOrCreateFile = async () => {
  await ensureDataDirectoryExists();
  try {
    return JSON.parse(await fs.readFile(filePath, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") {
      // If the file doesn't exist, create it with an empty object
      await fs.writeFile(filePath, JSON.stringify({}));
      return {};
    } else {
      throw error; // If the error is not related to file non-existence, re-throw it.
    }
  }
};

const saveGrantId = async (userId, grantId) => {
  console.log("Saving grant ID for user", userId, ":", grantId);

  const data = await readOrCreateFile();
  data[userId] = grantId;
  await fs.writeFile(filePath, JSON.stringify(data));
};

const getGrantId = async (userId) => {
  console.log("Retrieving grant ID for user", userId);

  const data = await readOrCreateFile();
  return data[userId];
};

export { saveGrantId, getGrantId };
