import OpenAI from "openai";

const openAI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const openAIMiddleware = (req, res, next) => {
  req.openAI = openAI;
  next();
};

export default openAIMiddleware;

// try {
//   const chatCompletion = await req.openAI.chat.completions.create({
//     messages: [{ role: "user", content: "Say this is a test" }],
//     model: "gpt-3.5-turbo",
//   });

//   res.json(chatCompletion);
// } catch (error) {
//   console.error("Error fetching chat completions:", error);
//   res.json({ error: error.message });
// }
