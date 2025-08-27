import * as React from "react";
import { cn } from "@/utils/cn";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  errorMessage?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  startText?: string;
  endText?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      error,
      errorMessage,
      startIcon,
      endIcon,
      startText,
      endText,
      rows = 3,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        <div
          className={cn(
            "flex items-start border bg-white rounded-md text-sm transition-colors",
            startIcon || startText ? "gap-2" : "",
            error
              ? "border-red-500 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500 focus-within:ring-opacity-50"
              : "border-gray-300 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-opacity-50"
          )}
        >
          {/* Start Icon/Text */}
          {(startIcon || startText) && (
            <div className="flex items-start gap-2 text-gray-500 py-2 px-2 text-sm">
              {startIcon && (
                <span className="flex items-center mt-1">{startIcon}</span>
              )}
              {startText && <span className="font-medium">{startText}</span>}
            </div>
          )}

          {/* Textarea Field */}
          <textarea
            rows={rows}
            className={cn(
              "flex-1 bg-transparent py-2 text-sm resize-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              startIcon || startText ? "pl-0" : "px-3",
              endIcon || endText ? "pr-0" : "px-3",
              error && "text-red-600 placeholder:text-red-400",
              className
            )}
            ref={ref}
            {...props}
          />

          {/* End Icon/Text */}
          {(endIcon || endText) && (
            <div className="flex items-start gap-2 text-gray-500 py-2 px-2 text-sm">
              {endText && <span className="font-medium">{endText}</span>}
              {endIcon && (
                <span className="flex items-center mt-1">{endIcon}</span>
              )}
            </div>
          )}
        </div>
        {error && errorMessage && (
          <p className="mt-1 text-xs text-red-600">{errorMessage}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
