"use client";

import { useState } from "react";
import { Header } from "./ui/header";
import { Footer } from "./ui/footer";
import { EmailEntry } from "./email-entry";

export function MainLayout() {
  const [selectedTool, setSelectedTool] = useState("openai");

  const handleToolChange = (tool: string) => {
    console.log("Selected tool:", tool);

    setSelectedTool(tool);
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden border-t border-gray-200 dark:border-gray-800">
      <Header onToolChange={handleToolChange} defaultTool={selectedTool} />
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="grid gap-2 p-6">
          <EmailEntry selectedTool={selectedTool} />
        </div>
      </div>
      <div className="h-6 w-6 animate-spin">
        <span className="sr-only">Loading...</span>
      </div>
      <Footer />
    </div>
  );
}
