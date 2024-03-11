import LLMService from "./llmService.js";
import OpenAI from "openai";

const openAI = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

class OpenAIService extends LLMService {
  constructor() {
    super();
    this.llm = openAI;
  }

  async summarize(preppedEmail) {
    const prompt = this.generatePrompt(preppedEmail);

    const response = await this.llm.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: prompt,
        },
      ],
    });

    return response.choices[0].message.content;
  }
}

export default OpenAIService;
