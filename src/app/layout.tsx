import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { SceneProvider } from "@/components/scene-context";
import { Scenes } from "@/components/Scenes";
import { Window } from "@/components/Window";
import { Header } from "@/components/Header";
import { OrderNow } from "@/components/OrderNow";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pho Heritage",
  description:
    "Vibes that entice you in, recipes that bring you back. Traditional Vietnamese dishes, a few fusion plates, and curated cocktails in Richmond, VA.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#fef9ef",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${instrument.variable}`}>
      <body className="h-dvh overflow-hidden overscroll-none font-sans antialiased">
        <SceneProvider>
          <Scenes />
          <Header />
          <main className="relative z-10 h-dvh overflow-x-hidden overflow-y-auto overscroll-y-contain">
            {children}
            <Footer />
          </main>
          <OrderNow />
          <Window />
        </SceneProvider>
      </body>
    </html>
  );
}
