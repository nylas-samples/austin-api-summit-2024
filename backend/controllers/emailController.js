import {
  fetchEmailsFromNylas,
  prepareEmailForLLMAPI,
} from "../services/emailService.js";
import { getLLMService } from "../services/llmSelectorService.js";

const sendEmail = async (req, res) => {
  const { nylas, nylasGrantId } = req;

  try {
    const sentMessage = await nylas.messages.send({
      identifier: nylasGrantId,
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
  const { nylas, nylasGrantId } = req;
  const limit = Math.min(parseInt(req.query.limit) || 5, 50);
  const llmServiceName = req.query.llmServiceName || "openai";

  try {
    const emails = await fetchEmailsFromNylas(nylas, nylasGrantId, limit);

    if (!emails || emails.length === 0) {
      console.log("No messages found. Redirecting to login.");
      return res.redirect("/auth/nylas");
    }

    const emailsWithSummaries = await Promise.all(
      emails.map(async (email) => {
        const preppedEmail = prepareEmailForLLMAPI(email);
        const llmService = getLLMService(llmServiceName);

        const summary = await llmService.summarize(preppedEmail);

        const summarizedEmail = {
          id: email.id,
          senderName: preppedEmail.formattedFrom,
          senderInitials: preppedEmail.formattedFromInitials,
          subject: preppedEmail.subject,
          summary,
          time: preppedEmail.formattedDate,
        };

        return summarizedEmail;
      })
    );

    console.log(emailsWithSummaries);

    return res.json(emailsWithSummaries);
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
