import type { Metadata } from "next";
import localFont from "next/font/local";
import { PAGE_TITLE, PAGE_DESCRIPTION } from "@/configuration/ui";
import "./globals.css";
import { ErrorWrapper } from "./parts/error/error-wrapper";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <TooltipProvider>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {/* Chatbot Header */}
          <div className="chatbot-header">
            <img src="/favicon.ico" alt="SynthAI" className="chatbot-avatar" />
            <span className="chatbot-name">SynthAI</span>
          </div>

          <main>
            <ErrorWrapper>{children}</ErrorWrapper>
          </main>
        </body>
      </TooltipProvider>
    </html>
  );
}
