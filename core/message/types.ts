export type BaseMessage = {
  type: string;
  [key: string]: any;
};

export type MessageComponent = React.ReactNode;

export interface MessageHandler<T extends BaseMessage> {
  createMessageComponent(message: T): MessageComponent;
  supports(message: T): boolean;
}
