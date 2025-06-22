import { useEffect } from "react";

import { DEFAULT_PRIMARY_COLOR } from "../api/constants";
import { ChatWindow } from "./chat-window";
import { ChatManager, ChatManagerOptions } from "./manager/chat-manager";
import { useChatStore } from "../stores/chat";
import { serviceStore } from "../stores/service";
import { ChatExtension } from "../type";
import { BaseMessage, MessageHandler } from "./message/types";
import { MessageHandlerManager } from "./manager/mesage-handler-manager";
import { BackendManager } from "./manager/backend-manager";
import { BackendStrategy } from "./strategy/backend-stragedy";

const DEFAULT_OPTIONS: ChatManagerOptions = {
  title: "Chat Toolkit",
  primaryColor: DEFAULT_PRIMARY_COLOR,
  launcherSize: 48,
  allowSendFile: false,
};

export function ChatToolkit({
  options,
  initialOpen = false,
  backend,
  extensions = [],
  messageHandlers = [],
}: {
  options: ChatManagerOptions;
  initialOpen?: boolean;
  backend: BackendStrategy;
  extensions?: (typeof ChatExtension)[];
  messageHandlers?: MessageHandler<BaseMessage>[];
}) {
  const { setOptions } = useChatStore((state) => ({
    setOptions: state.setOptions,
  }));

  useEffect(() => {
    setOptions({ ...DEFAULT_OPTIONS, ...options });
  }, [options]);

  useEffect(() => {
    console.log("Init ChatManager");
    const backendManager = new BackendManager(backend);
    serviceStore.getState().setChatManager(
      new ChatManager({
        backendManager,
      }),
    );
    serviceStore
      .getState()
      .setMessageHandlerManager(new MessageHandlerManager(messageHandlers));
  }, [backend, extensions, messageHandlers]);

  return <ChatWindow initialOpen={initialOpen} />;
}
