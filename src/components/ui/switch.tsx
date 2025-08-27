import React from "react";
import { cn } from "@/utils/cn";

export interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
  label?: string;
  description?: string;
  size?: "sm" | "md" | "lg";
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked,
      onCheckedChange,
      disabled = false,
      className,
      id,
      label,
      description,
      size = "md",
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "w-9 h-5",
      md: "w-11 h-6",
      lg: "w-14 h-7",
    };

    const thumbSizeClasses = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    };

    const handleToggle = () => {
      if (!disabled) {
        onCheckedChange(!checked);
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        handleToggle();
      }
    };

    return (
      <div className={cn("flex items-center gap-3", className)}>
        <button
          ref={ref}
          id={id}
          type="button"
          role="switch"
          aria-checked={checked}
          aria-labelledby={label ? `${id}-label` : undefined}
          aria-describedby={description ? `${id}-description` : undefined}
          disabled={disabled}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          className={cn(
            "relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out  disabled:cursor-not-allowed disabled:opacity-50",
            sizeClasses[size],
            checked ? "bg-primary" : "bg-gray-200 hover:bg-gray-300",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          tabIndex={disabled ? -1 : 0}
        >
          <span
            className={cn(
              "pointer-events-none inline-block transform rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out",
              thumbSizeClasses[size],
              checked
                ? size === "sm"
                  ? "translate-x-4"
                  : size === "md"
                  ? "translate-x-5"
                  : "translate-x-7"
                : "translate-x-0"
            )}
          />
        </button>

        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <label
                htmlFor={id}
                className={cn(
                  "text-sm font-medium cursor-pointer",
                  disabled
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-900"
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <span
                className={cn(
                  "text-sm",
                  disabled ? "text-gray-400" : "text-gray-600"
                )}
              >
                {description}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

Switch.displayName = "Switch";

export { Switch };
