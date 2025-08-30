import { LauncherPosition } from "@/lib/enums";
import { cn } from "@/lib/utils";
import { useLauncherStore } from "lib/stores/launcher";
import { cva } from "class-variance-authority";
import { ChevronDown, MessageCircle } from "lucide-react";
import Ballon from "../ballon/ballon";

const launcherVariants = cva(
  "cursor-pointer flex items-center justify-center duration-200 ease-out hover:scale-110 fixed bottom-4 rounded-full border-none",
  {
    variants: {
      position: {
        center: "",
        right: "right-4",
        left: "left-4",
      },
      icon: {
        default: "shadow-launcher active:scale-90 active:-rotate-90 bg-primary",
        custom: "",
      },
    },
    defaultVariants: {
      position: LauncherPosition.RIGHT,
    },
  }
);

export default function Launcher() {
  const { open, setOpen, autoSpeaks, setShowBallon } = useLauncherStore(
    (state) => ({
      mode: state.mode,
      open: state.open,
      setOpen: state.setOpen,
      autoSpeaks: state.autoSpeaks,
      setShowBallon: state.setShowBallon,
    })
  );

  const handleOpenChat = () => {
    setOpen(!open);
    setShowBallon(false);
  };

  return (
    <div className="right-4">
      <button
        data-testid="launcher"
        className={cn(
          "launcher-icon text-primary-foreground z-50",
          launcherVariants({
            position: LauncherPosition.RIGHT,
            icon: "default",
          })
        )}
        onClick={handleOpenChat}
      >
        {open ? <ChevronDown /> : <MessageCircle />}
      </button>
      {autoSpeaks?.map((autoSpeak) => (
        <Ballon
          key={autoSpeak.id}
          autoSpeak={autoSpeak}
          position={LauncherPosition.RIGHT}
        />
      ))}
    </div>
  );
}
