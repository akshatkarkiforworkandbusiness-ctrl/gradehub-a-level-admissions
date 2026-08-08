import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
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
  title: "GradeHub | Global A-Level & University Admissions Platform",
  description: "Calculate UCAS points, predict A-Level grades, convert to US GPA, check university requirements, and manage college applications for universities worldwide.",
  keywords: ["UCAS points calculator", "A-Level grade predictor", "A-Level to GPA converter", "university requirements checker", "UCAS tariff points", "A-Level subject matcher", "global university admissions"],
  openGraph: {
    title: "GradeHub | Global A-Level Admissions Hub",
    description: "Calculate UCAS points, predict grades, convert to GPA, and manage college applications for universities worldwide.",
    type: "website",
    locale: "en_GB",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "GradeHub",
    "description": "Global A-Level & University Admissions Platform",
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
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-blue-600 selection:text-white transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="min-h-screen flex flex-col">
            <Sidebar />
            <div className="lg:pl-64 flex flex-col flex-1 min-h-screen">
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </div>
        </ThemeProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
