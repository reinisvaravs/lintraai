// head.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://setinbound.com"),
  title: {
    default:
      "SetInbound.com | AI Receptionists for Appointment-Based Businesses",
    template:
      "%s | AI Receptionists for Appointment-Based Businesses | SetInbound.com",
  },
  description:
    "GET A FREE AI RECEPTIONIST - In 3 STEPS and just 2 days, you&#39;ll have your own AI receptionist - that you can use for Free until it starts making you money. If no results = no cost.",
  keywords: [
    "AI receptionist",
    "virtual receptionist",
    "appointment scheduling",
    "24/7 answering service",
    "inbound lead conversion",
    "business automation",
    "sales qualification",
    "missed call recovery",
    "California AI receptionist",
    "US virtual receptionist",
  ],
  authors: [
    { name: "SetInbound", url: "https://setinbound.com" },
    { name: "Reinis Varavs", url: "https://setinbound.com" },
    { name: "Henry Varavs", url: "https://setinbound.com" },
  ],
  creator: "SetInbound",
  publisher: "SetInbound",
  openGraph: {
    type: "website",
    url: "https://setinbound.com",
    title: "SetInbound.com | AI Receptionists for Appointment-Based Businesses",
    description:
      "Never lose a lead again. Book more appointments with our 24/7 AI receptionist - cheaper and faster than a human.",
    siteName: "SetInbound",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "SetInbound.com | AI Receptionists for Appointment-Based Businesses",
    description:
      "Never lose a lead again. Book more appointments with our 24/7 AI receptionist - cheaper and faster than a human.",
    creator: "@setinbound.com",
    site: "@setinbound.com",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "manifest", url: "/site.webmanifest" },
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#7F3DF4" },
    ],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
      notranslate: true,
    },
  },
  other: {
    google: "notranslate",
    "Content-Language": "en-US",
    translate: "no",
    "theme-color": "#7F3DF4",
    "json-ld": JSON.stringify({
      "@context": "https://schema.org",
      "@type": ["WebApplication", "LocalBusiness"],
      name: "SetInbound",
      url: "https://setinbound.com",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "SetInbound provides AI receptionists for appointment-based businesses, including dentists, medspas, salons, clinics, legal, real estate, financial services, restaurants, gyms, property managers, and more. Never miss a lead again with 24/7 booking, qualification, and call handling.",
      serviceArea: {
        "@type": "Place",
        name: "California, USA",
      },
      address: {
        "@type": "PostalAddress",
        addressCountry: "US",
      },
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
      },
      potentialAction: [
        {
          "@type": "CommunicateAction",
          name: "Test Call AI Receptionist",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://setinbound.com",
            actionPlatform: "https://schema.org/DesktopWebPlatform",
          },
        },
        {
          "@type": "ScheduleAction",
          name: "Schedule a Meeting",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://setinbound.com",
            actionPlatform: "https://schema.org/DesktopWebPlatform",
          },
        },
        {
          "@type": "ReserveAction",
          name: "Book Appointment",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://setinbound.com",
            actionPlatform: "https://schema.org/DesktopWebPlatform",
          },
        },
      ],
      author: {
        "@type": "Organization",
        name: "SetInbound",
        url: "https://setinbound.com",
      },
      creator: [
        {
          "@type": "Person",
          name: "Reinis Varavs",
          url: "https://setinbound.com",
        },
        {
          "@type": "Person",
          name: "Henry Varavs",
          url: "https://setinbound.com",
        },
      ],
    }),
  },
};
