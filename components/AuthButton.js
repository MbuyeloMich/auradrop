"use client";

import { useState, useEffect } from "react";
import { signOut } from "@/app/actions";
import AuthModal from "./AuthModal";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut } from "lucide-react";
import { useTheme } from "next-themes";

export default function AuthButton({ user }) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (user) {
    const isDark = mounted && theme === "dark";
    const signOutClass = `gap-2 ${isDark ? "bg-orange-500 hover:bg-orange-600 text-white" : ""}`;

    return (
      <form action={signOut}>
        <Button
          variant={isDark ? "" : "ghost"}
          size="sm"
          type="submit"
          className={signOutClass}
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </form>
    );
  }

  return (
    <>
      <Button
        onClick={() => setShowAuthModal(true)}
        variant="default"
        size="sm"
        className="bg-orange-500 hover:bg-orange-600 gap-2"
      >
        <LogIn className="w-4 h-4" />
        Sign In
      </Button>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}
