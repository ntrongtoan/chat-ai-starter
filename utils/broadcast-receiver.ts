import { BaseMessage } from "@/ore/message/types";

export class BroadcastReceiver {
  private channel: BroadcastChannel;

  constructor() {
    this.channel = new BroadcastChannel("test");
  }

  subscribe(listener: (messages: BaseMessage[]) => void) {
    const handler = (event: MessageEvent) => {
      listener(JSON.parse(event.data));
    };

    this.channel.addEventListener("message", handler);

    return () => {
      this.channel.removeEventListener("message", handler);
      this.channel.close();
    };
  }
}
