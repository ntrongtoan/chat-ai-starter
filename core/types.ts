export enum LauncherMode {
  POPUP = "default",
  EMBED = "embedded",
}

export enum LauncherSource {
  DEFAULT = "default",
  CUSTOM = "custom",
}

export enum LauncherPosition {
  RIGHT = "right",
  LEFT = "left",
  CENTER = "center",
}

export enum ChatAnimation {
  NONE = "none",
  SHOW = "show",
  HIDE = "hide",
}

export enum MessageSender {
  BOT = "bot",
  USER = "user",
}

export type ChatExtension = any;
export type ChatSetting = any;

export const DEFAULT_PRIMARY_COLOR = "#000000";
