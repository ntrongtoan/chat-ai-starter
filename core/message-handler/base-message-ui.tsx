import { cn } from "@/lib/utils";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Bot } from "lucide-react";

export interface BaseMessageProps {
  className?: string;
  children?: React.ReactNode;
  isSameBotSender?: boolean;
  isLastBotMessage?: boolean;
  showAvatar?: boolean;
  isBot?: boolean;
  dataTestId?: string;
  time?: string;
}

export function BaseMessageUI({
  className,
  showAvatar = true,
  isSameBotSender,
  isLastBotMessage,
  children,
  isBot,
  dataTestId = "ui-message",
  time,
}: BaseMessageProps) {
  return (
    <div
      className={cn(
        className,
        !isSameBotSender && !isLastBotMessage && "!mb-2",
        "animate-in fade-in slide-in-from-bottom"
      )}
      data-testid={dataTestId}
    >
      <div className={cn("flex items-end", isBot ? "" : "justify-end")}>
        {isBot && showAvatar && (
          <div
            className={cn(
              "w-10 h-10 mr-2 shrink-0 bg-primary rounded-md flex items-center justify-center text-primary-foreground",
              !isSameBotSender ? "visible" : "invisible"
            )}
          >
            <Bot className="size-5" />
          </div>
        )}
        {time ? (
          <Tooltip delayDuration={700}>
            <TooltipTrigger asChild>
              <div className={cn(showAvatar ? "inline-block" : "block w-full")}>
                {children}
              </div>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              align="start"
              className="rounded-sm text-white bg-gray-900 px-2 py-1 text-xs opacity-85"
            >
              {time}
            </TooltipContent>
          </Tooltip>
        ) : (
          <div className={cn(showAvatar ? "inline-block" : "block w-full")}>
            {children}
          </div>
        )}
      </div>
      {/* {isLastBotMessage && isBot && (
        <div className="basis-full text-gray mt-1 text-xs">
          <p className="ml-10 text-gray-700">{time}</p>
        </div>
      )} */}
    </div>
  );
}
