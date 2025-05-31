import { useEffect, useRef, useCallback } from "react";
import { ChatBaseMessage } from "./chat-base-message";
import { Spinner } from "./spinner";
import { MessageRole } from "./chat-window";

const TIMEOUT_SCROLL_TO_BOTTOM = 500;

const scrollToBottom = (element: HTMLDivElement) => {
  element.scrollIntoView({
    behavior: "smooth",
    block: "end",
  });
};

export function ChatBody() {
  // const { messages, isTalking } = useProsecutionHistoryAgentStore((state) => ({
  //   messages: state.messages,
  //   isTalking: state.isTalking,
  // }));
  const messages = [];
  const isTalking = false;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMoving = useRef(false);

  const handleScrollToBottom = useCallback(() => {
    if (messagesEndRef.current && !isMoving.current) {
      isMoving.current = true;
      const element = messagesEndRef.current;
      scrollToBottom(element);
      setTimeout(() => {
        scrollToBottom(element);
        isMoving.current = false;
      }, TIMEOUT_SCROLL_TO_BOTTOM);
    }
  }, []);

  // useEffect(() => {
  //   handleScrollToBottom();
  // }, [messages, handleScrollToBottom]);

  return (
    <div className="space-y-4 p-4" ref={messagesEndRef}>
      {/* {!messages.length && <ChatZeroState className="pt-[16rem]" />} */}

      {messages.map((message) => (
        <ChatBaseMessage
          avatarClassName="size-5 shrink-0 border border-primary bg-peacock-100"
          key={message.id}
          message={message.content}
          isSend={message.role === MessageRole.USER}
        />
      ))}

      {isTalking && (
        <ChatBaseMessage>
          <p>
            <Spinner className="size-4" /> Thinking...
          </p>
        </ChatBaseMessage>
      )}
    </div>
  );
}
