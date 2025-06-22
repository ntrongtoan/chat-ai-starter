"use client";

import { ChatAnimation, LauncherMode, LauncherPosition } from "@/core/types";
import { cva } from "class-variance-authority";
import ChatBody from "../chat-body/chat-body";
import ChatHeader from "../chat-header/ChatHeader";
import ChatInput from "../chat-input/ChatInput";
import IntentDrawer from "../intent-drawer/IntentDrawer";
import { PoweredLogo } from "../power-logo/powered-logo";

const chatVariants = cva("relative flex flex-col bg-primary border-l", {
  variants: {
    mode: {
      [LauncherMode.POPUP]:
        "fixed min-h-[300px] max-h-[750px] w-[380px] shadow-xl mt-auto top-[40px] transition-all duration-400",
      [LauncherMode.EMBED]: "h-full",
    },
    position: {
      center: "",
      right: "",
      left: "",
    },
    animation: {
      none: "",
      show: "animate-in fade-in duration-400 slide-in-from-bottom-1/3",
      hide: "animate-out fade-out duration-400 slide-out-to-bottom-1/3 fill-mode-forwards",
    },
  },
  compoundVariants: [
    {
      mode: LauncherMode.POPUP,
      position: LauncherPosition.LEFT,
      class: "left-4",
    },
    {
      mode: LauncherMode.POPUP,
      position: LauncherPosition.RIGHT,
      class: "right-4",
    },
  ],
  defaultVariants: {
    animation: ChatAnimation.NONE,
    mode: LauncherMode.POPUP,
    position: LauncherPosition.RIGHT,
  },
});

export default function ChatWindow({ manager }: { manager }) {
  // const { open, inputMessageShow, intentDrawerShow } = useLauncherStore(
  //   (state) => ({
  //     open: state.open,
  //     inputMessageShow: state.chatSetting.inputMessageShow,
  //     intentDrawerShow: state.intentButtons.length > 0,
  //   })
  // );
  const inputMessageShow = true;
  const intentDrawerShow = true;

  return (
    <div
      data-testid="chat"
      className={chatVariants({
        mode: LauncherMode.EMBED,
        position: LauncherPosition.RIGHT,
        animation: "none",
      })}
    >
      <ChatHeader />
      <ChatBody />
      <ChatInput />
      {/* {intentDrawerShow && <IntentDrawer />} */}
    </div>
  );
}
