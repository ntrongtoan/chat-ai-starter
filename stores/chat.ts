import { ChatManagerOptions } from "@/core/manager/chat-manager";
import { BaseMessage } from "@/core/message/types";
import { ChatExtension } from "@/core/types";
import { addIdToMessage } from "@/utils/add-id-to-message";
import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";

type State = {
  options: ChatManagerOptions | undefined;
  messages: BaseMessage[];
  extensions: ChatExtension[];
};

type Action = {
  setOptions: (options: ChatManagerOptions) => void;
  addMessage: (message: BaseMessage) => void;
  addMessages: (messages: BaseMessage[]) => void;
  setExtensions: (extensions: ChatExtension[]) => void;
  resetStore: () => void;
};

export type ChatStore = State & Action;

const initialState: State = {
  options: undefined,
  messages: [],
  extensions: [],
};

export const useChatStore = create<ChatStore>()(
  devtools(
    subscribeWithSelector((set) => ({
      ...initialState,
      setOptions: (options: ChatManagerOptions) =>
        set(() => ({
          options,
        })),
      addMessage: (message: BaseMessage) =>
        set((state) => ({
          messages: [...state.messages, addIdToMessage(message)],
        })),
      addMessages: (messages: BaseMessage[]) =>
        set((state) => ({
          messages: [...state.messages, ...messages.map(addIdToMessage)],
        })),
      setExtensions: (extensions: ChatExtension[]) =>
        set(() => ({
          extensions,
        })),
      resetStore: () =>
        set(() => ({
          ...initialState,
        })),
    })),
    {
      name: "chat-store",
      enabled: process.env.NODE_ENV === "development",
    }
  )
);
