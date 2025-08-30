import { cn } from "@/lib/utils";
import { useChatStore } from "@/stores/chat";
import { useLauncherStore } from "@/stores/launcher";
import { Paperclip, SendHorizontal } from "lucide-react";
import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button } from "../ui/button";
import { serviceStore } from "@/stores/service";
import { BaseMessage } from "@/core/message/types";

const MIN_HEIGHT = 64;

const ChatInput = ({ children }: { children?: React.ReactNode }) => {
  // const { options } = useChatStore((state) => ({
  //   options: state.options,
  // }));
  const options = {
    allowSendFile: true,
  };
  const intentDrawerShow = true;
  const messages = [];
  const [value, setValue] = useState("");
  const hasInputValue = !!value;
  const [isUploadingFile, setIsUploadingFile] = useState(false);

  const inputField = useRef<HTMLTextAreaElement>(null);
  const inputFileField = useRef<HTMLInputElement>(null);

  // const { intentDrawerShow } = useLauncherStore((state) => ({
  //   intentDrawerShow: state.intentButtons.length > 0,
  //   setBubbleLoading: state.setBubbleLoading,
  // }));
  // const { messages } = useChatStore((state) => ({
  //   messages: state.messages,
  // }));

  const [height, setHeight] = useState(MIN_HEIGHT);

  const [minLength, maxLength] = useMemo(() => {
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || lastMessage.type !== "text") return [null, null];
    return [
      lastMessage.text_count_min ?? null,
      lastMessage.text_count_max ?? null,
    ];
  }, [messages]);

  const isNotValidLength = useMemo(() => {
    return (
      (minLength !== null && value.length < minLength) ||
      (maxLength !== null && value.length > maxLength)
    );
  }, [minLength, maxLength, value]);

  const typing = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  const onChangeValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const hasInputValue = !!e.target.value;
    updateTextAreaHeight(hasInputValue);
    setValue(e.target.value);
  };

  const onSubmit = () => {
    const data = {
      type: "text",
      isBot: false,
      withIcon: true,
      text: value,
    } as BaseMessage;
    // setBubbleLoading(true);
    setValue("");
    updateTextAreaHeight(false);

    serviceStore.getState().chatManager.sendMessage([data]);
    inputField.current?.focus();
  };

  const updateTextAreaHeight = (hasInputValue: boolean) => {
    const maxAvailableHeight = window.innerHeight / 4;
    const newHeight = hasInputValue
      ? inputField.current && inputField.current?.scrollHeight > MIN_HEIGHT
        ? Math.min(inputField.current?.scrollHeight, maxAvailableHeight)
        : MIN_HEIGHT
      : MIN_HEIGHT;
    setHeight(newHeight);
  };

  const selectFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const file = files ? files[0] : null;
    if (!file) return;

    switch (file.type) {
      case "application/pdf":
        break;
      default:
        try {
          setIsUploadingFile(true);
          // const { key } = await uploadFile(file);
          // sendMessage(backend, {
          //   text: "",
          //   content_type: file.type,
          //   s3_object_key: key,
          // });
        } finally {
          setIsUploadingFile(false);
        }
    }
    if (inputField.current) {
      inputField.current.value = "";
    }
  };

  const clickSelectFile = (e: MouseEvent<HTMLInputElement>) => {
    e.currentTarget.value = "";
  };

  return (
    <div className="bg-white max-h-[calc(100%-60px)] p-2">
      <div className={cn("relative shrink-0 flex items-center justify-center")}>
        {/* {intentDrawerShow && <div className="w-12 shrink-0" />} */}
        <textarea
          placeholder="Message..."
          className="bg-gray-50 w-full resize-none border-none outline-none overflow-hidden rounded-sm text-sm px-4 py-2"
          ref={inputField}
          value={value}
          onChange={onChangeValue}
          onKeyDown={typing}
          style={{ height: height }}
        />
        <div
          className="flex items-center py-2 max-h-full ml-auto"
          style={{ height: height }}
        >
          {hasInputValue && (
            <Button
              className={cn(
                "w-8 h-8 bg-transparent mx-1 p-2 text-primary hover:text-primary/80"
              )}
              variant="ghost"
              onClick={onSubmit}
              disabled={isNotValidLength}
              data-testid="send-button"
            >
              <SendHorizontal />
            </Button>
          )}
          {options.allowSendFile && !hasInputValue && (
            <>
              <input
                type="file"
                accept="image/*, application/pdf"
                className="hidden"
                onChange={selectFile}
                onClick={clickSelectFile}
                ref={inputFileField}
                disabled={isUploadingFile}
              />
              <Button
                className="w-8 h-8 bg-transparent mx-1 p-2 text-primary hover:text-primary/80"
                variant="ghost"
                onClick={() => inputFileField.current?.click()}
                disabled={isUploadingFile}
                data-testid="attachment-button"
              >
                <Paperclip />
              </Button>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default ChatInput;
