import LLMService from "./llmService.js";
import { HfInference } from "@huggingface/inference";

const hfInference = new HfInference(process.env.HUGGINGFACE_API_KEY);

class HuggingFaceService extends LLMService {
  constructor() {
    super();
    this.llm = hfInference;
  }

  async summarize(preppedEmail) {
    const prompt = this.generatePrompt(preppedEmail);

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

export default HuggingFaceService;
