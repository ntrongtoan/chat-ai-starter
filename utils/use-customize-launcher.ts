import { useChatStore } from "lib/stores/chat";
import { useLauncherStore } from "lib/stores/launcher";
import { useEffect } from "react";
import { convertLuminance, hexToHSL, isLowLuminance } from "./convertHexToHsl";

export function useCustomizeLauncher({
  appRef,
}: {
  appRef: React.RefObject<HTMLDivElement>;
}) {
  const { options } = useChatStore((state) => ({
    options: state.options,
  }));
  const { setShowBallon, open } = useLauncherStore((state) => ({
    setOpen: state.setOpen,
    setShowBallon: state.setShowBallon,
    open: state.open,
  }));

  useEffect(() => {
    if (open) {
      setShowBallon(false);
    }
  }, [open]);

  useEffect(() => {
    if (!options) return;

    const primaryColor = convertLuminance(hexToHSL(options.primaryColor));

    appRef.current?.style.setProperty("--primary", primaryColor);

    appRef.current?.style.setProperty(
      "--primary-foreground",
      isLowLuminance(primaryColor)
        ? "var(--foreground-white)"
        : "var(--foreground-black)",
    );

    appRef.current?.style.setProperty(
      "--launcher-desktop-size",
      options.launcherSize + "px",
    );
  }, [options]);
}
