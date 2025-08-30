import {
  BaseMessage,
  MessageComponent,
  MessageHandler,
} from "../message/types";
import { BaseMessageUI } from "./base-message-ui";
import { SanitizedText } from "./santinize";

export interface TextMessage extends BaseMessage {
  text: string;
  isBot?: boolean;
  time?: string;
}

export function UIText({ message }: { message: TextMessage }) {
  return (
    <BaseMessageUI isBot={message.isBot} time={message.time} className="px-4">
      <SanitizedText text={message.text} isBot={false} />
    </BaseMessageUI>
  );
}

export class TextMessageHandler implements MessageHandler<TextMessage> {
  type = "text";

  createMessageComponent(message: TextMessage): MessageComponent {
    return <UIText message={message} />;
  }

  supports(message: BaseMessage) {
    return message.type === this.type;
  }
}
