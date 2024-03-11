import OpenAI from "openai";

const openAI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const openAIMiddleware = (req, res, next) => {
  req.openAI = openAI;
  next();
};

export default openAIMiddleware;
