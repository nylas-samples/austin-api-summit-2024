// TODO: Implement Ollama service
// TODO: Instantiate llm services here

// Define a common interface
class LLMService {
  async summarize(email, metadata) {
    throw new Error("Not implemented");
  }
}

// OpenAI implementation
class OpenAIService extends LLMService {
  constructor(llm) {
    super();
    this.llm = llm;
  }

  async summarize(preppedEmail) {
    const response = await this.llm.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `
            You are an email summarizer receiving an email body with the HTML tags stripped out. You have 100 characters to summarize the following message:
            ${preppedEmail.formattedFrom} sent an email to ${preppedEmail.formattedTo} with the subject: ${preppedEmail.subject} on ${preppedEmail.formattedDate}. The email body is:
            ${preppedEmail.cleanedBody}
            tl;dr:
          `,
        },
      ],
    });
    console.log("OpenAI response:", response);
    return response;
  }
}

// Hugging Face implementation
class HuggingFaceService extends LLMService {
  constructor(llm) {
    super();
    this.llm = llm;
  }

  async summarize(preppedEmail) {
    console.log("Summarizing email message...");
    console.log("Prepped email:", preppedEmail);

    const prompt = `
      You are an email summarizer receiving an email body with the HTML tags stripped out. You have 100 characters to summarize the following message:
      ${preppedEmail.formattedFrom} sent an email to ${preppedEmail.formattedTo} with the subject: ${preppedEmail.subject} on ${preppedEmail.formattedDate}. The email body is:
      ${preppedEmail.cleanedBody}
      tl;dr:
    `;

    const response = await this.llm.textGeneration({
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      inputs: prompt,
    });

    // Remove the prompt from the beginning of the generated text, if present
    let summary = response.generated_text;
    if (summary.startsWith(prompt)) {
      summary = summary.slice(prompt.length).trim();
    }

    return { ...response, generated_text: summary };
  }
}

// Ollama implementation
class OllamaService extends LLMService {
  async summarize(email, metadata) {
    // TODO: Implement summarization
  }
}

// Service selector
function getLLMService(serviceName, llm) {
  switch (serviceName) {
    case "OpenAI":
      return new OpenAIService(llm);
    case "HuggingFace":
      return new HuggingFaceService(llm);
    case "Ollama":
      return new OllamaService();
    default:
      throw new Error("Unsupported LLM service");
  }
}

export { getLLMService };
