import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/providers";
import { Navbar } from "@/components/organisms/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "mealapp — Discover Delicious Foods",
  description:
    "Browse ingredients and discover delicious meals from around the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`} suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans"
      >
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-6 text-center text-sm text-zinc-400">
            © {new Date().getFullYear()} mealapp · Powered by{" "}
            <a
              href="https://www.themealdb.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-500 transition-colors"
            >
              TheMealDB
            </a>
          </footer>
        </Providers>
      </body>
    </html>
  );
}

