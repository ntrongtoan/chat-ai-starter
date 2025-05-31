import { ChatWindow } from "@/components/chat-window";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1"></div>
      <div className="w-1/3 max-w-[400px] shrink-0 border-l border-border-secondary">
        <ChatWindow />
      </div>
    </div>
  );
}
