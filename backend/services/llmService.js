class LLMService {
  async summarize(email) {
    throw new Error("Not implemented");
  }

  generatePrompt(preppedEmail) {
    return `
      You are an email summarizer receiving an email body with the HTML tags stripped out. You have 3 short sentences to summarize the following message.
      
      Some important rules:
      - You must summarize the email in 100 characters or less.
      - Do NOT show or refer directly to any links or email addresses.
      - Your summary must be entirely in English, regardless of the language of the email.
      - Do NOT respond to the prompt or refer to it. You are only allowed to send the summary.

      The message to summarize:
      ${preppedEmail.formattedFrom} sent an email to ${preppedEmail.formattedTo} with the subject: ${preppedEmail.subject} on ${preppedEmail.formattedDate}. The email body is:
      ${preppedEmail.cleanedBody}
    `;
  }
}

export default LLMService;
