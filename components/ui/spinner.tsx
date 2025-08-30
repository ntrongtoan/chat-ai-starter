import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

export interface SpinnerProps {
  className?: string;
}

function Spinner({ className }: SpinnerProps) {
  return (
    <LoaderCircle className={cn("m-2 inline-block animate-spin", className)} />
  );
}

export { Spinner };
