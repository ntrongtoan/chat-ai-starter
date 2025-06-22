import {
  BaseMessage,
  MessageComponent,
  MessageHandler,
} from "../message/types";

export class MessageHandlerManager {
  private handlers: MessageHandler<BaseMessage>[] = [];

  constructor(handlers: MessageHandler<BaseMessage>[]) {
    this.handlers = handlers;
  }

  processMessage(message: BaseMessage): MessageComponent {
    for (const handler of this.handlers) {
      if (handler.supports(message)) {
        return handler.createMessageComponent(message);
      }
    }
    return <div>Unsupported message type: {message.type}</div>;
  }
}
