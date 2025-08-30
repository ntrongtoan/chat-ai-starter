// import { Message } from "@/api/message";

export interface BaseMessage {
  type: string;
  [key: string]: any;
}

export type MessageType = {
  text: string;
};

export type MessageComponent = React.ReactNode;

export class MessageFactory<T extends BaseMessage> {
  type: string;

  createMessage(message: T): MessageComponent {
    return <>{JSON.stringify(message)}</>;
  }
}
