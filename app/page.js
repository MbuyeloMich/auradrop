import { createClient } from "@/utils/supabase/server";
import { getProducts } from "./actions";
import AddProductForm from "@/components/AddProductForm";
import ProductCard from "@/components/ProductCard";
import { TrendingDown, Shield, Bell, Rabbit } from "lucide-react";
import AuthButton from "@/components/AuthButton";
import ThemeToggle from "@/components/ThemeToggle";
import QuotesRotator from "@/components/QuotesRotator";
import Image from "next/image";
import { supabaseConfig } from "@/utils/supabase/config";

export default async function Home() {
  let user = null;

  if (supabaseConfig.isConfigured) {
    const supabase = await createClient();
    const {
      data: { user: resolvedUser },
    } = await supabase.auth.getUser();
    user = resolvedUser;
  }

  const products = user ? await getProducts() : [];

  const FEATURES = [
    {
      icon: Rabbit,
      title: "Lightning fast",
      description:
        "Track prices in seconds across dynamic e-commerce pages.",
    },
    {
      icon: Shield,
      title: "Reliable by design",
      description:
        "Runs on a robust stack with dependable daily checks.",
    },
    {
      icon: Bell,
      title: "Instant alerts",
      description: "Get notified the moment your target price is hit.",
    },
  ];

  const STEPS = [
    {
      title: "Add a product link",
      description: "Paste any product URL and start tracking instantly.",
    },
    {
      title: "We monitor price changes",
      description: "auradrop checks your products on a schedule.",
    },
    {
      title: "Get alerts when it drops",
      description: "You get notified as soon as the best price appears.",
    },
  ];

  return (
    <main className="min-h-screen bg-linear-to-b from-white via-orange-50/40 to-white">
      <header className="sticky top-0 z-30 border-b border-gray-200/80 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Image
              src="/deal-drop-logo.jpg"
              alt="Deal Drop Logo"
              width={600}
              height={200}
              className="h-9 w-auto sm:h-10"
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <AuthButton user={user} />
          </div>
        </div>
      </header>

      <section className="px-4 pb-14 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pt-20">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-medium text-orange-700 sm:text-sm">
            Built for smart shoppers
          </div>

          <h1 className="max-w-4xl text-center text-4xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
            Track any product and catch the best price before everyone else.
          </h1>

          <p className="mt-5 max-w-2xl text-center text-base text-gray-600 sm:text-lg">
            auradrop monitors your favorite products and alerts you instantly
            when prices drop.
          </p>

          <div className="shimmer-shell mt-10 w-full max-w-3xl rounded-3xl border border-gray-200/70 bg-white/90 p-4 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)] sm:p-6">
            <AddProductForm user={user} />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500 sm:text-sm">
            <span className="rounded-full border border-gray-200 bg-white px-3 py-1.5">
              Works across major stores
            </span>
            <span className="rounded-full border border-gray-200 bg-white px-3 py-1.5">
              Real-time price signals
            </span>
            <span className="rounded-full border border-gray-200 bg-white px-3 py-1.5">
              Secure Google sign-in
            </span>
          </div>

          {products.length === 0 && (
            <div className="mt-14 grid w-full max-w-6xl gap-4 md:grid-cols-3">
              {FEATURES.map(({ icon: Icon, title, description }, index) => (
                <div
                  key={title}
                  className="reveal-up group rounded-2xl border border-gray-200/80 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ animationDelay: `${index * 110}ms` }}
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-1 text-lg font-semibold text-gray-900">
                    {title}
                  </h3>
                  <p className="text-sm text-gray-600">{description}</p>
                </div>
              ))}
            </div>
          )}

          <section className="mt-18 w-full max-w-6xl rounded-3xl border border-gray-200/80 bg-white px-6 py-8 sm:px-8 sm:py-10">
            <h3 className="text-center text-2xl font-semibold text-gray-900 sm:text-3xl">
              How it works
            </h3>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {STEPS.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-2xl border border-gray-100 bg-gray-50/70 p-5"
                >
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-orange-600">
                    Step {index + 1}
                  </p>
                  <h4 className="mb-1 font-semibold text-gray-900">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10 w-full max-w-5xl pb-6 text-center">
            <div className="rounded-2xl border border-gray-200/70 bg-white px-4 py-5 sm:px-8 sm:py-7">
              <QuotesRotator />
            </div>
          </section>
        </div>
      </section>

      {user && products.length > 0 && (
        <section className="mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <p className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-orange-600">
                Dashboard
              </p>
              <h3 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                Your tracked products
              </h3>
            </div>
            <span className="self-start rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-500 sm:self-auto">
              {products.length} {products.length === 1 ? "product" : "products"}
            </span>
          </div>

          <div className="grid items-start gap-6 md:grid-cols-2">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {user && products.length === 0 && (
        <section className="mx-auto max-w-3xl px-4 pb-24 text-center sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-10 sm:p-14">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50">
              <TrendingDown className="h-7 w-7 text-orange-500" />
            </div>
            <h3 className="mb-2 text-2xl font-semibold text-gray-900">
              No products yet
            </h3>
            <p className="mx-auto max-w-md text-gray-600">
              Add your first product above and build your personal price-tracking
              dashboard.
            </p>
          </div>
        </section>
      )}
    </main>
  );
}
