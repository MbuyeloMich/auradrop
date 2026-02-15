"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = theme === "dark";
  const iconClass = isDark ? "w-4 h-4 text-white" : "w-4 h-4 text-gray-900";

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={
        "inline-flex items-center justify-center h-9 w-9 rounded-md border " +
        (isDark
          ? "bg-orange-500 border-orange-500 hover:bg-orange-600"
          : "border-gray-200 bg-white hover:bg-gray-50")
      }
      title="Toggle dark mode"
    >
      {isDark ? <Sun className={iconClass} /> : <Moon className={iconClass} />}
    </button>
  );
}
