import * as React from "react";
import LLMSelector from "./llm-selector";

interface HeaderProps {
  onToolChange: (value: string) => void;
  defaultTool: string;
}

export function Header({ onToolChange, defaultTool }: HeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
      <div className="text-lg font-bold">Email Summarizer</div>
      <div className="ml-auto">
        <LLMSelector value={defaultTool} onChange={onToolChange} />
      </div>
    </header>
  );
}
