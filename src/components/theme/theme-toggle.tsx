"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-20 h-10 bg-muted rounded-md animate-pulse" />;
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="flex items-center gap-2 px-3 py-2 rounded-md bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors"
        title={`Current theme: ${theme}. Click to toggle.`}
      >
        {theme === "light" ? (
          <>
            <Sun className="h-4 w-4" />
            {/* <span className="hidden sm:inline-block">Light</span> */}
          </>
        ) : (
          <>
            <Moon className="h-4 w-4" />
            {/* <span className="hidden sm:inline-block">Dark</span> */}
          </>
        )}
      </button>
    </div>
  );
}
