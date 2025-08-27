import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  options: SelectOption[];
  placeholder?: string;
  startIcon?: React.ReactNode;
  onChange?: (value: string) => void;
  className?: string;
  error?: boolean;
  errorMessage?: string;
  ariaLabel?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      placeholder,
      startIcon,
      onChange,
      className,
      error,
      errorMessage,
      ariaLabel,
      ...props
    },
    ref
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (onChange) {
        onChange(e.target.value);
      }
    };

    return (
      <div className="w-full">
        <div
          className={cn(
            "flex items-center border bg-white rounded-md text-sm transition-colors h-10",
            startIcon && "gap-2",
            error
              ? "border-red-500 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500 focus-within:ring-opacity-50"
              : "border-gray-300 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-opacity-50"
          )}
        >
          {startIcon && (
            <div className="flex items-center text-gray-500 px-2">
              {startIcon}
            </div>
          )}
          <select
            ref={ref}
            onChange={handleChange}
            className={cn(
              "flex-1 min-w-0.5 h-10 bg-transparent py-2 text-sm appearance-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              startIcon ? "pl-0 pr-8" : "px-3",
              className
            )}
            aria-label={ariaLabel}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="flex items-center px-2 pointer-events-none">
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </div>
        {error && errorMessage && (
          <p className="mt-1 text-xs text-red-600">{errorMessage}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
