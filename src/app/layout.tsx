import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { GoogleAnalytics } from "@/components/google-analytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sourceSerif4 = Source_Serif_4({
  variable: "--font-source-serif-4",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "AfterALevel.com | Premium A-Level & University Utility Platform",
  description: "Calculate UCAS points, predict A-Level grades, convert to US GPA, and check university requirements. The ultimate toolkit for A-Level and international students.",
  keywords: ["UCAS points calculator", "A-Level grade predictor", "A-Level to GPA converter", "university requirements checker", "UCAS tariff points", "A-Level subject matcher"],
  openGraph: {
    title: "AfterALevel.com | A-Level & University Utilities",
    description: "Calculate UCAS points, predict grades, convert to GPA, and match subjects to degrees.",
    type: "website",
    locale: "en_GB",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Add global schema markup for the site
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AfterALevel.com",
    "description": "Premium A-Level & University Utility Platform",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${sourceSerif4.variable} antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-bg-page text-text-primary selection:bg-ink-navy selection:text-[#FAFAF6] transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
