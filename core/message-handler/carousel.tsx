import { Button } from "@/components/ui/button";
import { MessageComponent } from "../message-factory";
import { BaseMessage, MessageHandler } from "../message/types";
import { ButtonOption } from "./button";

export interface CarouselOption {
  placeholder: string;
  title: string;
  explain: string;
  buttons: ButtonOption[];
}

export interface CarouselMessage extends BaseMessage {
  isBot?: boolean;
  time?: string;
  carousels: CarouselOption[];
}

export const UICarousel = ({ message }: { message: CarouselMessage }) => {
  return (
    <div className="p-4 flex gap-4 overflow-auto" data-testid="ui-carousels">
      {message.carousels.map((carousel, i) => (
        <div
          key={i}
          className="w-[300px] shrink-0 rounded-lg border shadow-lg bg-white flex flex-col"
          data-testid="ui-carousel"
        >
          <div className="h-[200px]">
            <img
              src={carousel.placeholder}
              alt={carousel.title}
              className="w-full h-full object-cover rounded-t-lg"
            />
          </div>
          <div className="p-4 space-y-4">
            <p className="font-bold">{carousel.title}</p>
            <p className="text-sm">{carousel.explain}</p>
          </div>
          <div className="space-y-2 p-4 pt-0 mt-auto">
            {carousel.buttons.map((button, j) => (
              <Button key={j} className="block w-full">
                {button.text}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export class CarouselMessageHandler implements MessageHandler<CarouselMessage> {
  type = "carousel";

  createMessageComponent(message: CarouselMessage): MessageComponent {
    return <UICarousel message={message} />;
  }

  supports(message: BaseMessage) {
    return message.type === this.type;
  }
}
