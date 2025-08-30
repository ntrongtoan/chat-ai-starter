import { BaseMessageUI } from "@/core/message-handler/base-message-ui";

export default function BubbleLoading() {
  return (
    <BaseMessageUI
      showAvatar
      isSameBotSender
      isBot
      className="px-4"
      dataTestId="ui-bubble-loading"
    >
      <div className="h-8 w-10 rounded-sm flex justify-center items-center bg-gray-100">
        <div className="w-1 aspect-square rounded-full animate-message-loading"></div>
      </div>
    </BaseMessageUI>
  );
}
