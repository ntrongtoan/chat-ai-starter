"use client";

import { useChatStore } from "@/stores/chat";
import { Fragment } from "react/jsx-runtime";
import { useLauncherStore } from "@/stores/launcher";
import BubbleLoading from "../bubble-loading/bubble-loading";
import { serviceStore } from "@/stores/service";
import { BaseMessage } from "@/core/message/types";
import { useShallow } from "zustand/react/shallow";

export default function ChatBody() {
  const { messages } = useChatStore(
    useShallow((state) => ({
      messages: state.messages,
    }))
  );

  const { setChatRef, bubbleLoading } = useLauncherStore(
    useShallow((state) => ({
      setChatRef: state.setChatRef,
      bubbleLoading: state.bubbleLoading,
    }))
  );

  const renderMessage = (message: BaseMessage) => {
    const messageHandlerManager = serviceStore.getState().messageHandlerManager;

    if (!messageHandlerManager)
      throw new Error("messageHandlerManager is not initialized");

    return messageHandlerManager.processMessage(message);
  };

  return (
    <div
      className="rounded-t-xl grow overflow-y-auto space-y-2 py-4 bg-gray-50"
      ref={setChatRef}
    >
      {messages.map((message) => {
        return <Fragment key={message.id}>{renderMessage(message)}</Fragment>;
      })}
      {bubbleLoading && <BubbleLoading />}
    </div>
  );
}
