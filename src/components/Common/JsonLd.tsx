export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "LintraAI",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: "https://lintraai.com",
    },
    description:
      "Transform your solar sales with AI-powered voice agents that qualify leads, schedule appointments, and educate customers 24/7. Scale your solar business while reducing operational costs.",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "150",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        author: {
          "@type": "Person",
          name: "John Smith",
        },
        datePublished: "2024-01-15",
        reviewBody:
          "LintraAI has transformed our solar sales process. The AI agent handles initial customer interactions perfectly.",
      },
    ],
    featureList: [
      "AI-powered voice agents",
      "24/7 lead qualification",
      "Automated appointment scheduling",
      "Customer education",
      "Multi-language support",
    ],
    screenshot: [
      {
        "@type": "ImageObject",
        url: "https://lintraai.com/images/hero/hero-image.png",
        caption: "LintraAI Dashboard",
      },
    ],
    softwareVersion: "2.0",
    softwareHelp: "https://lintraai.com/support",
    downloadUrl: "https://lintraai.com/get-started",
    applicationSuite: "LintraAI Business Suite",
    permissions: "Requires internet connection",
    releaseNotes:
      "Latest version includes enhanced AI capabilities and improved scheduling features",
    browserRequirements: "Works with all modern browsers",
    softwareRequirements: "No installation required, cloud-based solution",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
