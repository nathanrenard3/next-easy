import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { SessionProviderWrapper } from "@/providers/session-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/react";
import { config } from "@/config";
import { ThemeProvider } from "@/providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });
const name = config.name;

export const metadata: Metadata = {
  title: name,
  description: "The best next template to start your project",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: process.env.URL_FRONT,
    siteName: name,
  },
  icons: {
    icon: "/icon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.className}`}>
        <ThemeProvider attribute="class" defaultTheme={config.defaultTheme}>
          <TooltipProvider>
            <SessionProviderWrapper>
              <main>{children}</main>
              <Toaster />
            </SessionProviderWrapper>
          </TooltipProvider>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
