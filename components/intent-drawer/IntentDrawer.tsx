import { cn } from "@/lib/utils";
import { useLauncherStore } from "@/stores/launcher";
import { ChevronDown, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export default function IntentDrawer() {
  // const { intentDrawerOpen, intentButtons, setIntentDrawerOpen } =
  //   useLauncherStore((state) => ({
  //     intentDrawerOpen: state.intentDrawerOpen,
  //     intentButtons: state.intentButtons,
  //     setIntentDrawerOpen: state.setIntentDrawerOpen,
  //   }));
  const intentDrawerOpen = true;
  const intentButtons = [];
  const setIntentDrawerOpen = () => {};

  const [showDrawerButtons, setShowDrawerButtons] = useState(intentDrawerOpen);

  useEffect(() => {
    if (intentDrawerOpen) {
      setShowDrawerButtons(true);
    }
  }, [intentDrawerOpen, setShowDrawerButtons]);

  const intentClicked = () => {
    setIntentDrawerOpen(false);
  };

  return (
    <>
      <div className="absolute bottom-[0px] left-[0px] w-12 h-12 flex items-end">
        <Button
          className={cn(
            "bg-primary hover:bg-primary/80 rounded-none p-none rounded-tr-lg shadow-drawer w-12 h-12 flex items-center justify-center text-primary-foreground active:bg-primary",
            "rounded-bl-lg"
          )}
          onClick={() => setIntentDrawerOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </Button>
      </div>
      {showDrawerButtons && (
        <div
          className={cn(
            "absolute bottom-[0px] left-0 right-0 w-full flex flex-col font-bold",
            intentDrawerOpen
              ? "animate-drawer-show"
              : "animate-drawer-hide fill-mode-forwards"
          )}
          onAnimationEnd={() => {
            if (!intentDrawerOpen) {
              setShowDrawerButtons(false);
            }
          }}
        >
          <Button
            className="w-full rounded-none h-12 flex justify-start px-4 gap-3 text-[16px] text-primary-foreground active:text-primary-foreground"
            variant="primary"
            onClick={() => setIntentDrawerOpen(false)}
          >
            <ChevronDown />
            <p>メニュー</p>
          </Button>
          <div className="py-2 bg-white">
            {intentButtons.map((button, idx) => (
              <Button
                key={idx}
                variant="ghost"
                className="w-full rounded-none h-12 px-4 cursor-pointer justify-start hover:bg-primary/5"
                onClick={() => intentClicked()}
              >
                <span className="truncate">{button.text}</span>
              </Button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
