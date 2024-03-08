const getSummaryFromLLMAPI = async (llm, preppedEmail, emailMetadata) => {
  console.log("Summarizing email message...");

  const response = await llm.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `
          You are an email summarizer receiving an email body with the HTML tags stripped out. You have 100 characters to summarize the following message:
          ${emailMetadata.from} sent an email to ${emailMetadata.to} with the subject: ${emailMetadata.subject} on ${preppedEmail.formattedDate}. The email body is:
          ${preppedEmail.cleanedBody}
          tl;dr:`,
      },
    ],
  });
  console.log("OpenAI response:", response);
  return response;
};

export { getSummaryFromLLMAPI };
