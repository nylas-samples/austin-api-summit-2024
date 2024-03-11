// email-entry.js

"use client";

import * as React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Separator } from "./ui/separator";

export function EmailEntry() {
  type Email = {
    id: string;
    senderName: string;
    senderInitials: string;
    subject: string;
    summary: string;
    time: string;
  };
  const [emails, setEmails] = React.useState<Email[]>([]);

  console.log("emails", emails);

  React.useEffect(() => {
    async function fetchEmails() {
      try {
        const response = await fetch(
          "http://localhost:3000/email/recent-emails?limit=2&llmServiceName=openai"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setEmails(data);
      } catch (error) {
        console.error("Failed to fetch emails:", error);
      }
    }

    fetchEmails();
  }, []);

  // Log the emails state each time it changes
  React.useEffect(() => {
    console.log("Emails state:", emails);
  }, [emails]);

  return (
    <>
      {emails.map((email) => (
        <>
          <div key={email.id} className="flex items-start gap-4 text-sm">
            <Avatar className="w-8 h-8">
              <AvatarImage alt={email.senderName} />
              <AvatarFallback>{email.senderInitials}</AvatarFallback>
            </Avatar>
            <div className="grid gap-0.5">
              <div className="font-semibold">{email.senderName}</div>
              <div className="line-clamp-2 text-xs">{email.subject}</div>
              <div className="line-clamp-2 text-xs">
                Summary: {email.summary}
              </div>
            </div>
            <div className="ml-auto text-xs">{email.time}</div>
          </div>
          <Separator className="h-px" />
        </>
      ))}
    </>
  );
}
