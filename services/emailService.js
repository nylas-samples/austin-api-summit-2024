import { stripHtml } from "string-strip-html";

const fetchEmailsFromNylas = async (nylas, limit) => {
  console.log("Fetching emails...");
  try {
    const identifier = process.env.USER_GRANT_ID;
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
  const { date, body } = email;
  const formattedDate = new Date(date).toLocaleDateString();
  const cleanedBody = stripHtml(body).result;
  return { formattedDate, cleanedBody };
};

export { fetchEmailsFromNylas, prepareEmailForLLMAPI };
