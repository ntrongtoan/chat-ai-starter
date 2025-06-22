import { BroadcastSender } from "lib/utils/broadcast-sender";
import { BackendManager } from "./backend-manager";
import { BaseMessage } from "../message/types";

export type ChatManagerOptions = {
  title: string;
  primaryColor: string;
  launcherSize: number;
  allowSendFile: boolean;
};

const broadcastSender = new BroadcastSender();

export class ChatManager {
  backendManager: BackendManager;

  constructor({ backendManager }: { backendManager: BackendManager }) {
    this.backendManager = backendManager;
    this.backendManager.setOnMessageReceived(this.onMessageReceived.bind(this));
  }

  onMessageReceived(messages: BaseMessage[]) {
    console.log("onMessageReceived", messages);
    broadcastSender.publish(messages);
  }

  sendMessage(messages: BaseMessage[]) {
    console.log("sendMessage", messages);
    broadcastSender.publish(messages);
    messages.forEach((message) => {
      if (!message.isBot) {
        this.backendManager.sendMessage(message);
      }
    });
  }
}
