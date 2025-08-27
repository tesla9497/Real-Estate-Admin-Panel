"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { cn } from "@/utils/cn";
import { MainLayoutProps } from "@/types";

export function MainLayout({ children, title }: MainLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 md:relative md:translate-x-0 transition-transform duration-300 ease-in-out",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Sidebar onClose={closeMobileMenu} />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Header */}
        <Header onMobileMenuToggle={toggleMobileMenu} title={title} />

        {/* Main content */}
        <main className="flex-1 overflow-auto px-4 py-2">{children}</main>
      </div>
    </div>
  );
}
