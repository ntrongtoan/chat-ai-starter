import {
  LauncherMode,
  LauncherPosition,
  DEFAULT_PRIMARY_COLOR,
} from "@/core/types";
import { ChatSetting } from "@/core/types";
import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";

type IntentButton = {
  label: string;
  value: string;
  text: string;
};

type AutoSpeak = {
  id: string;
  text: string;
  message: string;
};

interface LauncherState {
  open: boolean;
  mode: LauncherMode;
  position: LauncherPosition;
  chatSetting: ChatSetting;
  intentDrawerOpen: boolean;
  autoSpeaks?: AutoSpeak[];
  intentButtons: IntentButton[];
  chatRef: HTMLDivElement | null;
  bubbleLoading: boolean;
  showBallon: boolean;
  startFromBot: boolean;
  axis:
    | { left?: number; top?: number; right?: number; bottom?: number }
    | undefined;
  primaryColor: string;
}

type Action = {
  setOpen: (open: boolean) => void;
  setIntentButtons: (intentButtons: IntentButton[]) => void;
  setIntentDrawerOpen: (open: boolean) => void;
  setChatRef: (chatRef: HTMLDivElement | null) => void;
  setBubbleLoading: (bubbleLoading: boolean) => void;
  setShowBallon: (showBallon: boolean) => void;
  setAutoSpeak: (autoSpeaks: AutoSpeak[]) => void;
  setStartFromBot: (startFromBot: boolean) => void;
  setAxis: (
    axis:
      | { left?: number; top?: number; right?: number; bottom?: number }
      | undefined
  ) => void;
  setPrimaryColor: (primaryColor: string) => void;
};

const initialState: LauncherState = {
  open: false,
  intentDrawerOpen: false,
  mode: LauncherMode.POPUP,
  position: LauncherPosition.RIGHT,
  intentButtons: [],
  autoSpeaks: [],
  chatRef: null,
  chatSetting: {
    inputMessageShow: true,
    sendLocationEnabled: true,
    sendFileEnabled: true,
  },
  bubbleLoading: false,
  showBallon: true,
  startFromBot: false,
  axis: undefined,
  primaryColor: DEFAULT_PRIMARY_COLOR,
};

export const useLauncherStore = create<LauncherState & Action>()(
  devtools(
    subscribeWithSelector((set) => ({
      ...initialState,
      setOpen: (open) => set({ open }),
      setIntentDrawerOpen: (intentDrawerOpen) => set({ intentDrawerOpen }),
      setIntentButtons: (intentButtons) => set({ intentButtons }),
      setChatRef: (chatRef) => set({ chatRef }),
      setBubbleLoading: (bubbleLoading) => set({ bubbleLoading }),
      setShowBallon: (showBallon) => set({ showBallon }),
      setAutoSpeak: (autoSpeaks) => set({ autoSpeaks }),
      setStartFromBot: (startFromBot) => set({ startFromBot }),
      setAxis: (axis) => set({ axis }),
      setPrimaryColor: (primaryColor) => set({ primaryColor }),
    })),
    {
      name: "launcher-store",
      enabled: process.env.NODE_ENV === "development",
    }
  )
);
