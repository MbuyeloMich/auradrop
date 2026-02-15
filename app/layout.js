import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "auradrop — Never Miss a Price Drop",
  description: "auradrop — Track product prices and get instant alerts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system">
          {children}
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
