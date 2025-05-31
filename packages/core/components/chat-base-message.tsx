import { MessageRole as MessageRole } from "@/components/chat-window";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ChatBaseMessage({
  children,
  role = MessageRole.ASSISTANT,
}: {
  children?: React.ReactNode;
  role?: MessageRole;
}) {
  const user = {};
  if (role === MessageRole.ASSISTANT) {
    return (
      <div
        className={cn(
          "ml-auto flex items-start gap-2 duration-300 ease-in-out animate-in fade-in slide-in-from-bottom-10"
        )}
      >
        <Avatar
          className={cn(
            "mt-1 size-5 shrink-0 border border-primary bg-peacock-100"
          )}
        >
          <AvatarImage src="/logo_color.svg" alt="Patlytics" />
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
        <div className="space-y-2 text-sm">{children}</div>
      </div>
    );
  }

  return (
    <div className="flex items-start justify-end gap-2">
      <div className="space-y-2 text-sm">{children}</div>
      <Avatar className={cn("size-5 shrink-0 bg-background")}>
        <AvatarImage
          src={user?.picture ?? "/logo_color.svg"}
          alt={user?.name ?? "User"}
        />
        <AvatarFallback>{user?.name ?? "User"}</AvatarFallback>
      </Avatar>
    </div>
  );
}
