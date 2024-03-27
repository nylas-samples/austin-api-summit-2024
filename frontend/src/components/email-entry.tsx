"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Spinner } from "./ui/spinner";

interface EmailEntryProps {
  selectedTool: string;
}

export function EmailEntry({ selectedTool }: EmailEntryProps) {
  type Email = {
    id: string;
    senderName: string;
    senderInitials: string;
    subject: string;
    summary: string;
    time: string;
  };

  const [emails, setEmails] = React.useState<Email[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const router = useRouter();

  React.useEffect(() => {
    async function fetchEmails() {
      setIsLoading(true); // Start loading

      const limit = selectedTool === "ollama" ? 2 : 6;

      try {
        console.log("Fetching emails");

        const url = `http://localhost:3000/email/vibify-emails?limit=${limit}&llmServiceName=${selectedTool}`;

        const response = await fetch(url, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.redirect) {
          router.push(data.redirect);
          return;
        }

        setEmails(data);
      } catch (error) {
        console.error("Failed to fetch emails:", error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    }

    fetchEmails();
  }, [selectedTool, router]);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : (
        emails.map((email) => (
          <div key={email.id}>
            <div className="flex items-start gap-4 text-sm">
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
          </div>
        ))
      )}
    </>
  );
}
