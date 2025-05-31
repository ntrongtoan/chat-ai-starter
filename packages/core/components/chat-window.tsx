"use client";

import { useState } from "react";
import { ChatBody } from "./chat-body";
import { Textarea } from "./ui/textarea";

export enum MessageRole {
  USER = "user",
  ASSISTANT = "assistant",
}

export function ChatWindow() {
  // const {
  //   messages,
  //   addMessage,
  //   setIsTalking,
  //   appendToMessageText,
  //   selectedTerms,
  // } = useProsecutionHistoryAgentStore((state) => ({
  //   messages: state.messages,
  //   addMessage: state.addMessage,
  //   setIsTalking: state.setIsTalking,
  //   appendToMessageText: state.appendToMessageText,
  //   selectedTerms: state.selectedTerms,
  // }));
  const [message, setMessage] = useState("");

  const handleCallAgent = async (message: string) => {
    // try {
    //   setIsTalking(true);
    //   const assistantMessageId = Math.random().toString(36).substring(2, 15);

    //   addMessage({
    //     id: assistantMessageId,
    //     role: PriorArtAgentMessageRole.ASSISTANT,
    //     content: message,
    //   });
    // } finally {
    //   setIsTalking(false);
    // }
  };

  const handleAskMessage = (content: string) => {
    if (content.trim() === "") {
      return;
    }

    const askMessage = {
      id: Math.random().toString(36).substring(2, 15),
      role: MessageRole.USER,
      content: content,
    };
    // addMessage(askMessage);
    void handleCallAgent(content);
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="h-min-0 flex-1 overflow-auto border-b border-border-secondary">
        <ChatBody />
      </div>
      <div className="mt-auto shadow-[0rem_-0.5rem_0.5rem_rgba(0,0,0,0.015)]">
        <div className="space-y-2 bg-background p-3">
          <Textarea
            className="bg-background-secondary"
            placeholder="Ask AI any questions about your case"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleAskMessage(message);
                setMessage("");
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
