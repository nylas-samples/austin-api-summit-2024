import {
  fetchEmailsFromNylas,
  prepareEmailForLLMAPI,
} from "../services/emailService.js";
import { getLLMService } from "../services/llmSelectorService.js";

const vibifyEmails = async (req, res) => {
  const { nylas, nylasGrantId } = req;
  const limit = Math.min(parseInt(req.query.limit) || 5, 50);
  const llmServiceName = req.query.llmServiceName || "openai";

  try {
    const emails = await fetchEmailsFromNylas(nylas, nylasGrantId, limit);

    if (!emails || emails.length === 0) {
      console.log("No messages found. Informing client to redirect.");
      return res.status(200).json({ redirect: "/auth/nylas" });
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

export { vibifyEmails };
