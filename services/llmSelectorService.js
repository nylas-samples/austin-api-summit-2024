import OpenAIService from "./openAIService.js";
import HuggingFaceService from "./huggingFaceService.js";
// import OllamaService from "./ollamaService.js";

function getLLMService(serviceName) {
  switch (serviceName) {
    case "OpenAI":
      return new OpenAIService();
    case "HuggingFace":
      return new HuggingFaceService();
    case "Ollama":
      return new OllamaService();
    default:
      throw new Error("Unsupported LLM service");
  }
}

export { getLLMService };
