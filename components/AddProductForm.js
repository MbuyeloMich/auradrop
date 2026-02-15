"use client";

import { useState } from "react";
import { addProduct } from "@/app/actions";
import AuthModal from "./AuthModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

function runConfetti() {
  if (typeof window === "undefined") return;
  const colors = ["#ef4444", "#f97316", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6"];
  const duration = 2000;
  const count = 40;
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.left = "0";
  container.style.top = "0";
  container.style.width = "100%";
  container.style.height = "0";
  container.style.pointerEvents = "none";
  container.style.overflow = "visible";
  document.body.appendChild(container);

  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    el.style.position = "absolute";
    el.style.width = "8px";
    el.style.height = "12px";
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.left = Math.round(Math.random() * 100) + "vw";
    el.style.top = Math.round(Math.random() * 20) + "vh";
    el.style.transform = `translateY(0) rotate(${Math.random() * 360}deg)`;
    el.style.opacity = "1";
    el.style.borderRadius = "2px";
    el.style.transition = `transform ${duration}ms cubic-bezier(.2,.9,.2,1), opacity ${duration}ms`;
    container.appendChild(el);
    requestAnimationFrame(() => {
      const dx = (Math.random() - 0.5) * 200;
      const dy = 600 + Math.random() * 200;
      const rot = (Math.random() - 0.5) * 720;
      el.style.transform = `translate(${dx}px, ${dy}px) rotate(${rot}deg)`;
      el.style.opacity = "0";
    });
  }

  setTimeout(() => container.remove(), duration + 300);
}

export default function AddProductForm({ user }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setShowAuthModal(true);
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("url", url);

    const result = await addProduct(formData);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(result.message || "Product tracked successfully!");
      // celebration confetti (inline fallback)
      try {
        runConfetti();
      } catch (e) {
        // ignore
      }
      setUrl("");
    }

    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste a product URL (Takealot, Cotton On, Zara...)"
            className="h-12 rounded-xl border-gray-200 bg-white text-base shadow-none"
            required
            disabled={loading}
          />

          <Button
            type="submit"
            disabled={loading}
            className="h-12 rounded-xl bg-orange-500 px-8 text-sm font-semibold transition-transform duration-200 hover:scale-[1.02] hover:bg-orange-600 active:scale-[0.98] sm:min-w-[170px]"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Track Price"
            )}
          </Button>
        </div>

        <p className="mt-3 text-left text-xs text-gray-500 sm:text-sm">
          Start by pasting one product link. We handle the tracking and alerts.
        </p>
      </form>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}
