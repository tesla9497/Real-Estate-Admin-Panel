"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, MoreVertical } from "lucide-react";
import { Button } from "./button";

export interface DropdownMenuItem {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: "default" | "destructive" | "warning";
}

interface DropdownMenuProps {
  items: DropdownMenuItem[];
  trigger?: React.ReactNode;
  triggerIcon?: "dots" | "chevron";
  align?: "left" | "right";
  className?: string;
}

const variantStyles = {
  default: "text-gray-700 hover:bg-gray-50",
  destructive: "text-red-700 hover:bg-red-50",
  warning: "text-amber-700 hover:bg-amber-50",
};

export const DropdownMenu = ({
  items,
  trigger,
  triggerIcon = "dots",
  align = "right",
  className = "",
}: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<"above" | "below">("below");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    if (!isOpen) {
      // Determine position when opening menu
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const menuHeight = items.length * 40 + 16; // Approximate height per item + padding
        const buffer = 20;

        // Find the container to check for boundaries
        const container = triggerRef.current.closest(
          ".overflow-x-auto, .overflow-auto"
        );
        let containerBottom = viewportHeight;

        if (container) {
          const containerRect = container.getBoundingClientRect();
          containerBottom = Math.min(viewportHeight, containerRect.bottom);
        }

        // Check available space
        const spaceBelow = containerBottom - rect.bottom - buffer;
        const spaceAbove = rect.top - buffer;

        // Position above if not enough space below and enough space above
        if (spaceBelow < menuHeight && spaceAbove > menuHeight) {
          setMenuPosition("above");
        } else {
          setMenuPosition("below");
        }
      }
    }
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: DropdownMenuItem) => {
    item.onClick();
    setIsOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getTriggerIcon = () => {
    if (triggerIcon === "chevron") {
      return <ChevronDown className="h-3 w-3" />;
    }
    return <MoreVertical className="h-3 w-3" />;
  };

  const getAlignmentClass = () => {
    return align === "left" ? "left-0" : "right-0";
  };

  const getPositionClass = () => {
    return menuPosition === "above" ? "bottom-8" : "top-8";
  };

  return (
    <div className={`relative ${className}`}>
      {/* Trigger Button */}
      {trigger ? (
        <div onClick={handleToggle}>{trigger}</div>
      ) : (
        <Button
          ref={triggerRef}
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 text-gray-600 hover:bg-gray-100"
          onClick={handleToggle}
        >
          {getTriggerIcon()}
        </Button>
      )}

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className={`absolute ${getAlignmentClass()} ${getPositionClass()} z-10 w-32 bg-white border border-gray-200 rounded-md shadow-lg py-1`}
          style={{
            maxHeight: "200px",
            overflow: "hidden",
          }}
        >
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => handleItemClick(item)}
              className={`w-full px-3 py-2 text-left text-sm flex items-center space-x-2 ${
                variantStyles[item.variant || "default"]
              }`}
            >
              {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
