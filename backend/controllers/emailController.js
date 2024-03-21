import {
  fetchEmailsFromNylas,
  prepareEmailForLLMAPI,
} from "../services/emailService.js";
import { getLLMService } from "../services/llmSelectorService.js";
import logger from "../services/loggerService.js";

export const vibifyEmails = async (req, res) => {
  const {
    nylas,
    session: { nylasGrantId },
  } = req;

  logger.info("Nylas grant ID:", nylasGrantId);
  const limit = Math.min(parseInt(req.query.limit) || 5, 50);
  const llmServiceName = req.query.llmServiceName || "openai";

  try {
    const emails = await fetchEmailsFromNylas(nylas, nylasGrantId, limit);

    if (!emails || emails.length === 0) {
      logger.info("No messages found. Informing client to redirect.");
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
    logger.error("Error processing user emails:", error);
    if (error.statusCode === 401) {
      logger.info("Redirecting to login.");
      return res.redirect("/auth/nylas");
    }

    return res.status(500).json({ message: "Error processing user emails" });
  }
};
