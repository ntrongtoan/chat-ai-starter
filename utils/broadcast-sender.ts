import { BaseMessage } from "@/ore/message/types";

export class BroadcastSender {
  private channel: BroadcastChannel;

  constructor() {
    this.channel = new BroadcastChannel("test");
  }

  publish(messages: Omit<BaseMessage, "id">[]) {
    this.channel.postMessage(JSON.stringify(messages));
  }

  destroy() {
    this.channel.close();
  }
}
