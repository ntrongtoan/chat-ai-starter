import { BaseMessage } from "@/ore/message/types";
import { BackendStrategy } from "../strategy/backend-stragedy";

export class BackendManager {
  private strategy: BackendStrategy;

  constructor(strategy: BackendStrategy) {
    this.strategy = strategy;
  }

  sendMessage(message: BaseMessage) {
    this.strategy.sendMessage(message);
  }

  setOnMessageReceived(callback: (messages: BaseMessage[]) => void) {
    this.strategy.setOnResponse(callback);
  }
}
