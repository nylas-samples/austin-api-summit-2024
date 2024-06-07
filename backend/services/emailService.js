import { stripHtml } from "string-strip-html";
import logger from "./loggerService.js";

const fetchEmailsFromNylas = async (nylas, nylasGrantId, limit) => {
  logger.info("Fetching emails...");

  try {
    const identifier = nylasGrantId;
    const messages = await nylas.messages.list({
      identifier,
      queryParams: { limit, in: "INBOX" },
    });
    return messages.data;
  } catch (error) {
    logger.error("Error fetching emails:", error);
    throw error;
  }
};

const getInitials = (name, email) => {
  if (name) {
    const splitName = name.split(" ");
    if (splitName.length > 1) {
      // If there's a name with a space, grab the first letter of the first 2 words
      return splitName[0][0] + splitName[1][0];
    } else {
      // If there's a name with no space, grab the first 2 letters of the word
      return name.substring(0, 2);
    }
  }
  // If there's no name, grab the first 2 letters of the email address
  return email.substring(0, 2);
};

const prepareEmailForLLMAPI = (email) => {
  logger.info("Cleaning email message...");
  const { date, body, subject, from, to } = email;

  const formattedDate = new Date(date * 1000).toLocaleDateString();
  const formattedFrom = from
    .map((contact) => `${contact.name} <${contact.email}>`)
    .join(`, `);
  const formattedTo = to
    .map((contact) => `${contact.name} <${contact.email}>`)
    .join(`, `);
  const cleanedBody = stripHtml(body).result;

  const formattedFromInitials = from
    .map((contact) => getInitials(contact.name, contact.email))
    .join("");

  return {
    formattedDate,
    formattedFrom,
    formattedFromInitials,
    formattedTo,
    subject,
    cleanedBody,
  };
};

export { fetchEmailsFromNylas, prepareEmailForLLMAPI };
