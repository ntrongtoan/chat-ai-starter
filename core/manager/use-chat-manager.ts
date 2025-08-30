import { useState } from "react";
import { MessageType } from "../message/message-types";
import { ChatManager } from "./chat-manager";

export function useChatManager(options: { messageTypes: MessageType[] }) {
  const [chatManager] = useState(() => new ChatManager(options.messageTypes));

  return chatManager;
}
