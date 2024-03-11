import ollama from "ollama";
import LLMService from "./llmService.js";

class OllamaService extends LLMService {
  constructor() {
    super();
    this.llm = ollama;
  }

  async summarize(preppedEmail) {
    const prompt = this.generatePrompt(preppedEmail);

    const response = await ollama.chat({
      model: "llama2",
      messages: [
        {
          role: "system",
          content: prompt,
        },
      ],
    });

    return response.message.content;
  }
}

export default OllamaService;
