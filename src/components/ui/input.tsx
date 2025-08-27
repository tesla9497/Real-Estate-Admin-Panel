import * as React from "react";
import { cn } from "@/utils/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  startText?: string;
  endText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      error,
      errorMessage,
      startIcon,
      endIcon,
      startText,
      endText,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        <div
          className={cn(
            "flex items-center border bg-white rounded-md px-2 gap-2 focus-within:ring-2 focus-within:ring-primary focus-within:ring-opacity-50 transition-colors",
            error
              ? "border-red-500 focus-within:border-red-500 focus-within:ring-red-500"
              : "border-gray-300 focus-within:border-primary focus-within:ring-primary"
          )}
        >
          {/* Start Icon/Text */}
          {(startIcon || startText) && (
            <div className="flex items-center gap-2 text-gray-500 py-2 text-sm">
              {startIcon && (
                <span className="flex items-center">{startIcon}</span>
              )}
              {startText && <span className="font-medium">{startText}</span>}
            </div>
          )}

          {/* Input Field */}
          <input
            type={type}
            className={cn(
              "flex-1 min-w-0.5 h-10 bg-transparent py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              error && "text-red-600 placeholder:text-red-400",
              className
            )}
            ref={ref}
            {...props}
          />

          {/* End Icon/Text */}
          {(endIcon || endText) && (
            <div className="flex items-center gap-2 text-gray-500 py-2 text-sm">
              {endText && <span className="font-medium">{endText}</span>}
              {endIcon && <span className="flex items-center">{endIcon}</span>}
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
Input.displayName = "Input";

export { Input };
