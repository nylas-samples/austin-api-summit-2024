import {
  fetchEmailsFromNylas,
  prepareEmailForLLMAPI,
} from "../services/emailService.js";
import { getSummaryFromLLMAPI } from "../services/llmService.js";

const sendEmail = async (req, res) => {
  try {
    const sentMessage = await req.nylas.messages.send({
      identifier: process.env.USER_GRANT_ID,
      requestBody: {
        to: [{ name: "Name", email: process.env.EMAIL }],
        replyTo: [{ name: "Name", email: process.env.EMAIL }],
        subject: "Your Subject Here",
        body: "Your email body here.",
      },
    });

    res.json(sentMessage);
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
};

const summarizeMessages = async (req, res) => {
  const { nylas, openAI } = req;
  const limit = Math.min(parseInt(req.query.limit) || 5, 50);

  try {
    const emails = await fetchEmailsFromNylas(nylas, limit);
    if (!emails || emails.length === 0) {
      console.log("No messages found. Redirecting to login.");
      return res.redirect("/auth/nylas");
    }

    const emailsWithSummaries = await Promise.all(
      emails.map(async (email) => {
        const preppedEmail = prepareEmailForLLMAPI(email);
        const summary = await getSummaryFromLLMAPI(openAI, preppedEmail, {
          from: email.from,
          to: email.to,
          subject: email.subject,
        });
        return { originalEmail: email, preppedEmail, summary };
      })
    );

    res.json(emailsWithSummaries);
  } catch (error) {
    console.error("Error processing user emails:", error);
    if (error.statusCode === 401) {
      console.log("Redirecting to login.");
      return res.redirect("/auth/nylas");
    }

    return res.status(500).json({ message: "Error processing user emails" });
  }
};

export { sendEmail, summarizeMessages };
