import React from "react";
import { cn } from "@/utils/cn";

interface HelperTextProps {
  children: React.ReactNode;
  variant?: "default" | "error" | "success" | "info";
  className?: string;
  error?: boolean;
}

export function HelperText({
  children,
  variant = "default",
  className,
  error = false,
}: HelperTextProps) {
  const variantStyles = {
    default: "text-gray-500",
    error: "text-red-600",
    success: "text-green-600",
    info: "text-blue-600",
  };

  // If error is true, override variant to show error styling
  const finalVariant = error ? "error" : variant;

  return (
    <p className={cn("text-xs mt-1", variantStyles[finalVariant], className)}>
      {children}
    </p>
  );
}
