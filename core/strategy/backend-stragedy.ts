import { BaseMessage } from "../message/types";

export interface BackendStrategy {
  sendMessage(message: BaseMessage): Promise<void>;
  setOnResponse(callback: (messages: BaseMessage[]) => void): void;
}
