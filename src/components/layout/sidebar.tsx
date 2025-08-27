"use client";

import { usePathname } from "next/navigation";
import { Home, Building2, Users, Settings, X } from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import { SidebarProps } from "@/types";

const navigationItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: Building2, label: "Properties", href: "/properties" },
  { icon: Users, label: "Agents", href: "/agents" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar({ onClose }: SidebarProps) {
  const currentPath = usePathname();

  const isSelected = (href: string) => {
    if (href === "/") {
      return currentPath === "/";
    }
    return currentPath.startsWith(href);
  };

  const handleNavigation = () => {
    // Close mobile menu on navigation
    if (onClose) {
      onClose();
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-sidebar-background border-r border-sidebar-border transition-all duration-300",
        // Mobile: full width, Desktop: responsive width
        "w-48 md:w-48 lg:w-48",
        !onClose && "md:w-16 lg:w-16"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
        <h1 className="text-xl font-bold text-sidebar-foreground truncate">
          Logo
        </h1>
        {onClose && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="md:hidden text-sidebar-foreground hover:bg-sidebar-hover"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-2 overflow-y-auto">
        {navigationItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => handleNavigation()}
            className={cn(
              "flex items-center gap-3 text-sm font-medium transition-all duration-200 hover:bg-sidebar-hover hover:text-sidebar-active-foreground text-sidebar-foreground rounded-md",
              // Mobile: always show labels, Desktop: conditional based on collapsed state
              "justify-start px-3 py-3",
              !onClose && "md:justify-center md:px-2 md:py-2",
              isSelected(item.href)
                ? "bg-sidebar-active text-sidebar-active-foreground shadow-sm"
                : ""
            )}
          >
            <item.icon className="h-4 w-4 flex-shrink-0" />
            {/* Always show labels on mobile, conditional on desktop */}
            <span
              className={cn(
                "transition-all duration-300 whitespace-nowrap",
                !onClose && "md:hidden"
              )}
            >
              {item.label}
            </span>
          </a>
        ))}
      </nav>
    </div>
  );
}
