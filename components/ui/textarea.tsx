import * as React from "react";

import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const textareaVariants = cva("", {
  variants: {
    state: {
      default: "border-gray-300",
      error: "border-red-600 focus-visible:border-red-600",
      success: "border-green-600 focus-visible:border-green-600",
    },
  },
  defaultVariants: {
    state: "default",
  },
});

export interface TextAreaProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  asChild?: boolean;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, state, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex w-full rounded-sm border bg-gray-100 px-2 py-1 text-sm placeholder:text-muted-foreground transition-all duration-100 outline-none",
          "focus-visible:shadow-none focus-visible:border-blue-600 focus-visible:bg-white disabled:cursor-not-allowed disabled:opacity-50",
          textareaVariants({ state }),
          className
        )}
        ref={ref}
        rows={4}
        {...props}
      />
    );
  }
);
TextArea.displayName = "TextArea";

export { TextArea };
