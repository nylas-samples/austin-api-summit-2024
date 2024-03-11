"use client";

import * as React from "react";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
      <div className="text-lg font-bold">Email Summarizer</div>
      <div className="flex items-center gap-4">
        <div className="grid gap-0.5">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a tool" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ollama">Ollama</SelectItem>
              <SelectItem value="summarify">Summarify</SelectItem>
              <SelectItem value="synopsis">Synopsis</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  );
}
