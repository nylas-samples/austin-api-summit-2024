import { stripHtml } from "string-strip-html";

const fetchEmailsFromNylas = async (nylas, nylasGrantId, limit) => {
  console.log("Fetching emails...");

  try {
    const identifier = nylasGrantId;
    const messages = await nylas.messages.list({
      identifier,
      queryParams: { limit },
    });
    return messages.data;
  } catch (error) {
    console.error("Error fetching emails:", error);
    throw error; // Rethrow and let the controller handle it
  }
};

const prepareEmailForLLMAPI = (email) => {
  console.log("Cleaning email message...");
  const { date, body, subject } = email;

  const formattedDate = new Date(date).toLocaleDateString();
  const formattedFrom = email.from
    .map((contact) => `${contact.name} <${contact.email}>`)
    .join(`, `);
  const formattedTo = email.to
    .map((contact) => `${contact.name} <${contact.email}>`)
    .join(`, `);
  const cleanedBody = stripHtml(body).result;

  return { formattedDate, formattedFrom, formattedTo, subject, cleanedBody };
};

export { fetchEmailsFromNylas, prepareEmailForLLMAPI };
