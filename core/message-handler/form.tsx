import { Button } from "@/components/ui/button";
import { MessageComponent } from "../message-factory";
import { BaseMessage, MessageHandler } from "../message/types";
import { BaseMessageUI } from "./base-message-ui";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/textarea";
import { FormLabel } from "./form-elements/form-label";

export interface FormMessageObject {
  id: string;
  label: string;
  purpose: "short_text" | "long_text";
}

export interface FormMessage extends BaseMessage {
  text: string;
  isBot?: boolean;
  time?: string;
  objects: FormMessageObject[];
}

const getInitialValues = (objects: FormMessageObject[]) => {
  return objects.reduce((acc, object) => {
    acc[object.id] = "";
    return acc;
  }, {});
};

type FormValues<T extends FormMessageObject[]> = {
  [K in T[number]["id"]]: string;
};

export function UIForm({ message }: { message: FormMessage }) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, isValid, isDirty },
    reset,
  } = useForm<FormValues<typeof message.objects>>({
    mode: "onBlur",
    values: getInitialValues(message.objects),
  });

  const renderFormObject = (object: FormMessageObject) => {
    switch (object.purpose) {
      case "short_text":
        return (
          <div className="space-y-2">
            <FormLabel required label={object.label} />
            <Input {...register(object.id)} />
          </div>
        );
      case "long_text":
        return (
          <div className="space-y-2">
            <FormLabel required label={object.label} />
            <TextArea {...register(object.id)} />
          </div>
        );
      default:
        return <div>Not implemented</div>;
    }
  };

  const onSubmit = (data: FormValues<typeof message.objects>) => {
    console.log(data);
  };

  return (
    <BaseMessageUI
      isBot={false}
      showAvatar={false}
      className="px-4"
      time={message.time}
    >
      <form
        className="ml-auto w-full max-w-[600px] py-8 px-6 rounded-sm border-t-2 border-t-primary shadow-sm border space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="text-sm font-semibold">{message.text}</p>
        {message.objects.map((object) => (
          <div key={object.id}>{renderFormObject(object)}</div>
        ))}
        {!isSubmitSuccessful && (
          <div className="flex justify-end gap-2">
            <Button
              className="w-auto"
              size="lg"
              type="button"
              disabled={!isDirty}
              onClick={() => {
                reset();
              }}
            >
              Reset
            </Button>
            <Button
              variant="primary"
              size="lg"
              type="submit"
              disabled={isSubmitting || !isValid}
            >
              Submit
            </Button>
          </div>
        )}
      </form>
    </BaseMessageUI>
  );
}

export class FormMessageHandler implements MessageHandler<FormMessage> {
  type = "form";

  createMessageComponent(message: FormMessage): MessageComponent {
    return <UIForm message={message} />;
  }

  supports(message: BaseMessage) {
    return message.type === this.type;
  }
}
