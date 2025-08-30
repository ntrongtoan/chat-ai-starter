import { MessageComponent } from "../message-factory";
import { BaseMessage, MessageHandler } from "../message/types";
import { Button } from "@/components/ui/button";
import { BaseMessageUI } from "./base-message-ui";
import { SanitizedText } from "./santinize";

export interface ButtonOption {
  text: string;
}

export interface ButtonMessage extends BaseMessage {
  text: string;
  isBot?: boolean;
  time?: string;
  buttons: ButtonOption[];
}

export function UIButton({
  message,
  onClick,
}: {
  message: ButtonMessage;
  onClick: (button: ButtonOption) => void;
}) {
  return (
    <>
      <BaseMessageUI
        showAvatar
        isBot={message.isBot}
        time={message.time}
        className="px-4"
      >
        <SanitizedText text={message.text} isBot={message.isBot} />
      </BaseMessageUI>
      {!!message.buttons.length && (
        <div className="px-4 ml-12 animate-in fade-in slide-in-from-bottom">
          <div className="flex flex-wrap gap-2 items-start prose ml-auto">
            {message.buttons.map((button) => (
              <Button
                key={button.text}
                className="min-w-[80px] whitespace-pre-wrap leading-5 h-auto font-semibold text-left"
                onClick={() => onClick(button)}
              >
                {button.text}
              </Button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export class ButtonMessageHandler implements MessageHandler<ButtonMessage> {
  type = "button";

  createMessageComponent(message: ButtonMessage): MessageComponent {
    return <UIButton message={message} onClick={onClick} />;
  }

  supports(message: BaseMessage) {
    return message.type === this.type;
  }
}
