import "./globals.css";
import Providers from "./providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tech Fuel — AI Developer Platform",
  description:
    "Learn AI tools, generate code, build projects, and prepare for interviews. The modern platform for developers.",
  keywords: [
    "AI",
    "developer",
    "tutorials",
    "code generator",
    "learning platform",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-screen bg-[#09090b] text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
