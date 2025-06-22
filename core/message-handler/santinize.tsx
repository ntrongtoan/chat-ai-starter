import { cn } from "@/lib/utils";
import { purify } from "lib/utils/purify";

export function SanitizedText({
  text,
  isBot,
}: {
  text: string;
  isBot: boolean;
}) {
  const cleanText = purify.sanitize(text);

  return (
    <div
      className={cn(
        "rounded-lg px-4 py-3 text-sm break-all",
        "prose prose-a:underline prose-a:text-blue-500 prose-a:hover:text-blue-600",
        isBot ? "bg-gray-100" : "bg-primary text-primary-foreground"
      )}
    >
      <div
        dangerouslySetInnerHTML={{ __html: cleanText }}
        className="whitespace-pre-wrap break-words"
      />
    </div>
  );
}
