import { MessageComponent } from "../message-factory";
import { BaseMessage, MessageHandler } from "../message/types";
import { BaseMessageUI } from "./base-message-ui";

export interface AudioMessage extends BaseMessage {
  url: string;
  isBot?: boolean;
  time?: string;
}

export function UIAudio({ message }: { message: AudioMessage }) {
  return (
    <BaseMessageUI
      showAvatar
      isBot={message.isBot}
      time={message.time}
      className="px-4"
    >
      <div className="mr-auto w-full max-w-3xl">
        <audio src={message.url} controls className="w-full" />
      </div>
    </BaseMessageUI>
  );
}

export class AudioMessageHandler implements MessageHandler<AudioMessage> {
  type = "audio";

  createMessageComponent(message: AudioMessage): MessageComponent {
    return <UIAudio message={message} />;
  }

  supports(message: BaseMessage) {
    return message.type === this.type;
  }
}
