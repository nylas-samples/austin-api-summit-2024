import * as React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface LLMSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const LLMSelector: React.FC<LLMSelectorProps> = ({ value, onChange }) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="flex h-10 items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2 text-sm">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="rounded-md border border-gray-200 bg-white shadow-md">
        <SelectItem value="openai">OpenAI | GPT 3.5 Turbo</SelectItem>
        <SelectItem value="huggingface">Hugging Face | Mistral</SelectItem>
        <SelectItem value="ollama">Ollama | Llama 2</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LLMSelector;
