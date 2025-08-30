import { ChatManager } from "@/ore/manager/chat-manager";
import { MessageHandlerManager } from "@/ore/manager/mesage-handler-manager";
import { createStore } from "zustand/vanilla";

type State = {
  chatManager: ChatManager | null;
  messageHandlerManager: MessageHandlerManager | null;
};

type Action = {
  setChatManager: (chatManager: ChatManager) => void;
  setMessageHandlerManager: (
    messageHandlerManager: MessageHandlerManager
  ) => void;
};

type Store = State & Action;

const initialState = {
  chatManager: null,
  messageHandlerManager: null,
};

export const serviceStore = createStore<Store>()((set) => ({
  ...initialState,
  setChatManager: (chatManager) => set({ chatManager }),
  setMessageHandlerManager: (messageHandlerManager) =>
    set({ messageHandlerManager }),
}));
