import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pixel & Ping — Network management without the noise",
  description:
    "Servers, endpoints, users and live traffic in a single dashboard. Monitor health, scan IP pools and manage ports across your whole fleet — from one calm surface.",
  keywords: [
    "network management",
    "server monitoring",
    "endpoint monitoring",
    "IP scanner",
    "dashboard",
    "Pixel & Ping",
  ],
  authors: [{ name: "Pixel & Ping" }],
  icons: {
    icon: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/brand/favicon-128.png`,
  },
  openGraph: {
    title: "Pixel & Ping — Network management without the noise",
    description:
      "Every route, server and endpoint. One calm dashboard. Live monitoring, clean IP scanning and port-level visibility for modern networks.",
    siteName: "Pixel & Ping",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pixel & Ping — Network management without the noise",
    description:
      "Servers, endpoints, users and live traffic in a single dashboard.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-[#09090b] text-zinc-100`}>
        {children}
      </body>
    </html>
  );
}
