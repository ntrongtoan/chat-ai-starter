import { MessageComponent } from "../message-factory";
import { BaseMessage, MessageHandler } from "../message/types";
import { BaseMessageUI } from "./base-message-ui";
import { cn } from "@/lib/utils";

export interface ImageMessage extends BaseMessage {
  url: string;
  isBot?: boolean;
  time?: string;
}

export function UIImage({ message }: { message: ImageMessage }) {
  return (
    <BaseMessageUI
      showAvatar
      isBot={message.isBot}
      time={message.time}
      className="px-4"
    >
      <div className={cn(message.isBot ? "mr-auto" : "ml-auto")}>
        <img
          src={message.url}
          alt={message.text}
          className="h-[217px] rounded-md object-contain"
        />
      </div>
    </BaseMessageUI>
  );
}

export class ImageMessageHandler implements MessageHandler<ImageMessage> {
  type = "image";

  createMessageComponent(message: ImageMessage): MessageComponent {
    return <UIImage message={message} />;
  }

  supports(message: BaseMessage) {
    return message.type === this.type;
  }
}
