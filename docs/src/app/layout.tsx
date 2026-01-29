import "@/app/global.css";
import { RootProvider } from "fumadocs-ui/provider/next";
import { Inter } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "GHOST ID - Privacy-First Web Analytics Platform",
    template: "%s | GHOST ID",
  },
  description:
    "Open-source, privacy-focused web analytics platform. Track your website performance without compromising user privacy. Self-hostable alternative to Google Analytics.",
  keywords: [
    "web analytics",
    "privacy analytics",
    "open source analytics",
    "Google Analytics alternative",
    "website tracking",
    "self-hosted analytics",
  ],
  authors: [{ name: "GHOST ID Team" }],
  creator: "GHOST ID",
  publisher: "GHOST ID",
  metadataBase: new URL("https://ghost-id.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ghost-id.com",
    siteName: "GHOST ID",
    title: "GHOST ID - Privacy-First Web Analytics Platform",
    description:
      "Open-source, privacy-focused web analytics platform. Track your website performance without compromising user privacy.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "GHOST ID Analytics Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GHOST ID - Privacy-First Web Analytics Platform",
    description:
      "Open-source, privacy-focused web analytics platform. Track your website performance without compromising user privacy.",
    images: ["/opengraph-image.png"],
    creator: "@yang_frog",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "",
    yandex: "",
    yahoo: "",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Script src="https://demo.ghost-id.com/api/script.js" data-site-id="21" />
      <Script
        src="https://demo.ghost-id.com/api/script.js?ns=demo"
        data-site-id="3b023d1a7895"
        data-namespace="ghost-id_demo"
      />
      <body className={`flex flex-col min-h-screen ${inter.variable} font-sans`}>
        <RootProvider
          theme={{
            enabled: true,
            enableSystem: true,
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
