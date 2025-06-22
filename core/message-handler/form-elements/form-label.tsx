import { cn } from "@/lib/utils";
import { RequiredBadge } from "./required-badge";

export function FormLabel({
  required,
  label,
  children,
  disabled,
  className,
}: {
  required?: boolean;
  label: string;
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex gap-2 items-center text-sm", className)}>
      {!disabled && required && <RequiredBadge />}
      <div className="font-bold">{label}</div>
      {!disabled && children}
    </div>
  );
}
