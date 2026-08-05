import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import { AuthProvider } from "../context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gift & Print Hub — Custom Gifts, Photo Prints & Corporate Merch",
  description:
    "Design personalized gifts, custom photo ceramic mugs, custom T-shirts, engraved wooden photo frames, corporate gift sets, and custom printed keepsakes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 font-sans"
      >
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
