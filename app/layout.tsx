import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

// Ouroboros display serif by Ariel Martín Pérez & H·Alix Sanyas (Velvetyne Type Foundry, OFL v1.1)
const ouroboros = localFont({
  src: "../public/fonts/ouroboros/ouroboros-regular.woff2",
  variable: "--font-ouroboros",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-display-fallback",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The World File  an unofficial desk for World",
  description:
    "An unofficial community file on World, the Solana prediction market. Guides, news, and a living archive. Not affiliated with world.xyz.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full ${ouroboros.variable} ${bricolage.variable}`}>
      <body className="min-h-full flex flex-col bg-bg text-ink antialiased">
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
