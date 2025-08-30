import { MessageComponent } from "../message-factory";
import { BaseMessage, MessageHandler } from "../message/types";
import { BaseMessageUI } from "./base-message-ui";

export interface VideoMessage extends BaseMessage {
  url: string;
  isBot?: boolean;
  time?: string;
}

export function UIVideo({ message }: { message: VideoMessage }) {
  return (
    <BaseMessageUI
      showAvatar
      isBot={message.isBot}
      time={message.time}
      className="px-4"
    >
      <div className="mr-auto w-full max-w-3xl">
        <video src={message.url} controls className="w-full" />
      </div>
    </BaseMessageUI>
  );
}

export class VideoMessageHandler implements MessageHandler<VideoMessage> {
  type = "video";

  createMessageComponent(message: VideoMessage): MessageComponent {
    return <UIVideo message={message} />;
  }

  supports(message: BaseMessage) {
    return message.type === this.type;
  }
}
