import { HfInference } from "@huggingface/inference";

const hfInference = new HfInference(process.env.HUGGINGFACE_API_KEY);

const hfInferenceMiddleware = (req, res, next) => {
  req.hfInference = hfInference;
  next();
};

export default hfInferenceMiddleware;
