import Chat from "@/components/chat-window/chat-window";
import Launcher from "@/components/launcher/Launcher";
import { useEffect, useRef } from "react";

import { TooltipProvider } from "@/components/ui/tooltip";
import { useChatStore } from "lib/stores/chat";
import { useLauncherStore } from "lib/stores/launcher";
import { BroadcastReceiver } from "lib/utils/broadcast-receiver";
import { useCustomizeLauncher } from "lib/utils/use-customize-launcher";
import { scrollDown } from "lib/utils/use-scroll-down";

export function ChatWindow({ initialOpen = false }: { initialOpen?: boolean }) {
  const appRef = useRef<HTMLDivElement>(null);
  const { addMessage } = useChatStore((state) => ({
    addMessage: state.addMessage,
  }));
  const { setOpen } = useLauncherStore((state) => ({
    setOpen: state.setOpen,
  }));

  useCustomizeLauncher({ appRef });

  useEffect(() => {
    if (initialOpen) {
      setOpen(true);
    }
  }, [initialOpen]);

  useEffect(() => {
    const unsubscribe = new BroadcastReceiver().subscribe((messages) => {
      messages.forEach((message) => {
        addMessage(message);
        scrollDown();
      });
    });

    return () => unsubscribe();
  }, []);

  return (
    <div ref={appRef}>
      <TooltipProvider>
        <Launcher />
        <Chat />
      </TooltipProvider>
    </div>
  );
}

export function useChatToolkit() {
  const { addMessage } = useChatStore((state) => ({
    addMessage: state.addMessage,
  }));

  return { addMessage };
}
