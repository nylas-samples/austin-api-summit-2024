import OpenAIService from "./openAIService.js";
import HuggingFaceService from "./huggingFaceService.js";
import OllamaService from "./ollamaService.js";

function getLLMService(serviceName) {
  serviceName = serviceName.toLowerCase();

  switch (serviceName) {
    case "openai":
      return new OpenAIService();
    case "huggingface":
      return new HuggingFaceService();
    case "ollama":
      return new OllamaService();
    default:
      throw new Error("Unsupported LLM service");
  }
}

export { getLLMService };
