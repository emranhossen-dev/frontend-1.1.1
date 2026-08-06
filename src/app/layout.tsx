import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import { AuthProvider } from "../context/AuthContext";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileBottomNav } from "../components/MobileBottomNav";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "websites — Modern Tech & Lifestyle E-Commerce Store",
  description:
    "Explore cutting-edge electronics, smartwatches, audio gear, accessories, and lifestyle products with a seamless mobile-first e-commerce experience.",
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
        className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 font-sans selection:bg-blue-600 selection:text-white"
      >
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col justify-between pb-14 md:pb-0">
              <Navbar />
              <div className="flex-1">{children}</div>
              <Footer />
              <MobileBottomNav />
            </div>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3500,
                style: {
                  background: "#18181b",
                  color: "#f4f4f5",
                  border: "1px solid #27272a",
                  borderRadius: "1rem",
                  fontSize: "13px",
                },
              }}
            />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
