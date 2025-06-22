import { serviceStore } from "@/stores/service";
import { BaseMessage } from "./message/types";
import { useChatStore } from "@/stores/chat";
import { useShallow } from "zustand/react/shallow";

export function useChatManager() {
  // const chatManager = serviceStore.getState().chatManager;
  // return chatManager;
  const { addMessage } = useChatStore(
    useShallow((state) => ({
      addMessage: state.addMessage,
    }))
  );

  return {
    sendMessage: (messages: BaseMessage[]) => {
      messages.forEach((message) => {
        addMessage(message);
      });
    },
  };
}
