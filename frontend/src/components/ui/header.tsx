"use client";

import * as React from "react";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";

interface HeaderProps {
  onToolChange: (value: string) => void;
  defaultTool: string;
}

export function Header({ onToolChange, defaultTool }: HeaderProps) {
  const handleSelectionChange = (value: string) => {
    onToolChange(value);
  };

  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
      <div className="text-lg font-bold">Email Summarizer</div>
      <div className="flex items-center gap-4">
        <div className="grid gap-0.5">
          <Select value={defaultTool} onValueChange={handleSelectionChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a tool" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="openai">OpenAI | GPT 3.5 Turbo</SelectItem>
              <SelectItem value="huggingface">
                Hugging Face | Mistral
              </SelectItem>
              <SelectItem value="ollama">Ollama | Llama 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  );
}
