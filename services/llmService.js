// Define a common interface
class LLMService {
  async summarize(email) {
    throw new Error("Not implemented");
  }

  generatePrompt(preppedEmail) {
    return `
      You are an email summarizer receiving an email body with the HTML tags stripped out. You have 100 characters to summarize the following message:
      ${preppedEmail.formattedFrom} sent an email to ${preppedEmail.formattedTo} with the subject: ${preppedEmail.subject} on ${preppedEmail.formattedDate}. The email body is:
      ${preppedEmail.cleanedBody}
      tl;dr:
    `;
  }
}

export default LLMService;
