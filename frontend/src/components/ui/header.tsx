import * as React from "react";
import LLMSelector from "./llm-selector";

interface HeaderProps {
  onToolChange: (value: string) => void;
  defaultTool: string;
}

export function Header({ onToolChange, defaultTool }: HeaderProps) {
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/nylas/logout", {
        credentials: "include",
      });

      if (response.ok) {
        // TODO: Handle post-logout logic; where to redirect
        console.log("Logged out successfully");

        window.location.reload();
      } else {
        // TODO: Handle errors, e.g., show an error message
        console.error("Logout failed");
      }
    } catch (error) {
      // TODO: Handle errors, e.g., show an error message
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
      <div className="text-lg font-bold">Email Summarizer</div>
      <div className="flex items-center">
        <LLMSelector value={defaultTool} onChange={onToolChange} />
        <button
          onClick={handleLogout}
          className="ml-4 text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700 underline"
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}
