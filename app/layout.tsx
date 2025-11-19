import type { Metadata } from "next";
import { ErrorBoundary } from '@/components/ErrorBoundary';
import "./globals.css";

export const metadata: Metadata = {
  title: "HyperFocus AI - ADHD Productivity Command Center",
  description: "The ultimate ADHD/hyperfixation productivity command center with voice commands, focus timer, and smart scheduling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
