"use client";

import { User, ChevronDown, Menu } from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import { HeaderProps } from "@/types";

export function Header({ className, onMobileMenuToggle, title }: HeaderProps) {
  return (
    <header
      className={cn(
        "flex items-center justify-between h-16 px-4 bg-background border-b border-border",
        className
      )}
    >
      {/* Mobile menu button and search */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        {/* Mobile menu button */}
        {onMobileMenuToggle && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onMobileMenuToggle}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-bold text-foreground">{title}</h2>
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-4">
        {/* User profile */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-foreground">John Doe</p>
              <p className="text-xs text-muted-foreground">Admin</p>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
