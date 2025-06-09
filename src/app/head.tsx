import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://lintraai.com"),
  title: {
    default: "LintraAI - AI Voice Agents for Solar Sales",
    template: "%s | LintraAI",
  },
  description:
    "Transform your solar sales with AI-powered voice agents that qualify leads, schedule appointments, and educate customers 24/7. Scale your solar business while reducing operational costs.",
  keywords: [
    "AI voice agents",
    "solar sales",
    "lead qualification",
    "appointment scheduling",
    "customer education",
    "solar business automation",
    "AI automation",
    "solar industry",
    "sales automation",
  ],
  authors: [{ name: "LintraAI", url: "https://lintraai.com" }],
  creator: "LintraAI",
  publisher: "LintraAI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://lintraai.com",
    languages: {
      "en-US": "https://lintraai.com",
    },
  },
  openGraph: {
    type: "website",
    url: "https://lintraai.com",
    title: "LintraAI - AI Voice Agents for Solar Sales",
    description:
      "Transform your solar sales with AI-powered voice agents that qualify leads, schedule appointments, and educate customers 24/7. Scale your solar business while reducing operational costs.",
    siteName: "LintraAI",
    images: [
      {
        url: "/images/hero/hero-image.png",
        width: 1200,
        height: 630,
        alt: "LintraAI - AI Voice Agents for Solar Sales",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "LintraAI - AI Voice Agents for Solar Sales",
    description:
      "Transform your solar sales with AI-powered voice agents that qualify leads, schedule appointments, and educate customers 24/7. Scale your solar business while reducing operational costs.",
    images: ["/images/hero/hero-image.png"],
    creator: "@lintraai",
    site: "@lintraai",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-touch-icon-precomposed.png",
    },
  },
  manifest: "/site.webmanifest",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
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
    google: "your-google-site-verification",
    yandex: "your-yandex-verification",
    yahoo: "your-yahoo-verification",
  },
  category: "technology",
  classification: "AI Software",
  referrer: "origin-when-cross-origin",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "LintraAI",
  },
  appLinks: {
    ios: {
      url: "https://lintraai.com",
      app_store_id: "your-app-store-id",
    },
    android: {
      package: "com.lintraai.app",
      app_name: "LintraAI",
    },
    web: {
      url: "https://lintraai.com",
      should_fallback: true,
    },
  },
  other: {
    google: "notranslate",
    "Content-Language": "en-US",
  },
};
