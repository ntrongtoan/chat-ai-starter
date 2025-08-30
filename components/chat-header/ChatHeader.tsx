"use client";

import { cn } from "@/lib/utils";
import { useChatStore } from "@/stores/chat";

export default function ChatHeader() {
  // const { options } = useChatStore((state) => ({
  //   options: state.options,
  // }));
  const options = {
    title: "Chat AI Starter",
  };

  return (
    <div className="h-12 flex items-center justify-center bg-primary text-primary-foreground shrink-0">
      <p className="text-base font-bold">{options.title}</p>
    </div>
  );
}
