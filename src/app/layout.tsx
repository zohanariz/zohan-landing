import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono, Anton, Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "700", "900"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: ["400"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Zohan Ariz | Turn Your Instagram Audience Into Recurring Income",
  description: "Help Instagram creators (20K–200K followers) build predictable $3K – $11K+ monthly recurring income from digital products in under 27 days. No sponsorships, affiliates, or upfront investment required.",
  keywords: ["Instagram monetization", "recurring income", "digital products", "creator economy", "content creators", "predictable income"],
  authors: [{ name: "Zohan Ariz" }],
  openGraph: {
    title: "Zohan Ariz | Turn Your Instagram Audience Into Recurring Income",
    description: "Help Instagram creators build predictable recurring income from digital products in under 27 days.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable} ${anton.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <Toaster theme="dark" closeButton position="bottom-right" toastOptions={{
          style: {
            background: '#161616',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            color: '#F0ECE3'
          }
        }} />
      </body>
    </html>
  );
}



