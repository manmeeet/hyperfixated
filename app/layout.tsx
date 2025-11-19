import type { Metadata } from "next";
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
        {children}
      </body>
    </html>
  );
}
