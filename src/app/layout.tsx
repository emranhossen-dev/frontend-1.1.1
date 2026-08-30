import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreShell from "@/components/StoreShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ardhimart.com"),
  title: "ArdhiMart — Gift Shop, Tech Gadgets & Custom Gifts in BD",
  description: "Shop unique gifts, tech gadgets, customized presents & surprise items at ArdhiMart. Enjoy fast 24h delivery across Bangladesh with Cash on Delivery!",
  keywords: [
    "ArdhiMart",
    "online gift shop bangladesh",
    "tech gadgets bd",
    "personalized gifts bd",
    "birthday gift shop bd",
    "gadgets as gifts bd",
    "unique gift items bd",
    "cash on delivery gifts bd",
  ],
  authors: [{ name: "ArdhiMart Team" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ardhimart.com",
    title: "ArdhiMart — Gift Shop, Tech Gadgets & Custom Gifts in BD",
    description: "Shop unique gifts, tech gadgets, customized presents & surprise items at ArdhiMart across Bangladesh.",
    siteName: "ArdhiMart",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "ArdhiMart Gift & Gadget Shop Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <StoreShell>{children}</StoreShell>
      </body>
    </html>
  );
}
