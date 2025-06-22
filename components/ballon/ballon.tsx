import { LauncherPosition } from "@/lib/enums";
import { cn } from "@/lib/utils";
import { useLauncherStore } from "lib/stores/launcher";
import { X } from "lucide-react";
import { Button } from "../ui/button";

type AutoSpeak = {
  message: string;
  image_preview_url?: string;
  button?: string;
};

const Ballon = ({
  autoSpeak,
  position,
}: {
  autoSpeak: AutoSpeak;
  position: LauncherPosition;
}) => {
  const { showBallon, setShowBallon, setOpen } = useLauncherStore((state) => ({
    showBallon: state.showBallon,
    setShowBallon: state.setShowBallon,
    setOpen: state.setOpen,
  }));

  const handleClickButton = () => {
    setShowBallon(false);
    setOpen(true);
  };

  const handleClickImage = () => {
    //
  };

  if (!showBallon) return null;

  return (
    <div
      className={cn(
        "auto-speak-ballon z-50",
        "space-y-2 p-4 rounded-lg border border-gray-300 shadow-md bg-white gap-2 w-[300px] fixed bottom-4",
        position === LauncherPosition.LEFT ? "left-4" : "right-4",
        "animate-in fade-in ease-in-out duration-500 slide-in-from-right-10"
      )}
    >
      <p className="text-sm">{autoSpeak.message}</p>
      {autoSpeak.image_preview_url && (
        <div className="h-[120px] cursor-pointer" onClick={handleClickImage}>
          <img
            className="w-full h-full object-contain"
            src={autoSpeak.image_preview_url}
          />
        </div>
      )}
      {autoSpeak.button && (
        <div className="flex flex-wrap gap-2 overflow-hidden">
          {autoSpeak.button.split(",").map((button, idx) => (
            <Button
              variant="secondary"
              key={idx}
              className="rounded-md max-w-full flex-1 truncate"
              onClick={() => handleClickButton()}
            >
              <p className="truncate">{button}</p>
            </Button>
          ))}
        </div>
      )}
      <Button
        variant="ghost"
        className="p-0 rounded-full w-8 h-8 absolute -top-4 -right-3 text-white bg-gray-900/20 hover:bg-gray-900/30 hover:text-white"
        onClick={() => setShowBallon(false)}
      >
        <div>
          <X className="w-4 h-4" />
        </div>
      </Button>
    </div>
  );
};

export default Ballon;
