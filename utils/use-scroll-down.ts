import { useLauncherStore } from "lib/stores/launcher";

export const scrollDown = () => {
  const { chatRef } = useLauncherStore.getState();
  if (!chatRef) return;

  setTimeout(() => {
    chatRef.scrollTo({
      top: chatRef.scrollHeight,
      behavior: "smooth",
    });
  }, 100);
};
