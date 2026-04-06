import { Nunito, Lora } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "600", "700", "800", "900"],
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: ["500", "600"],
});

export const metadata = {
  title: "Pampered Companion Care — Safety Companion",
  description:
    "Safety & wellness companion app for seniors, powered by Pampered Companion Care.",
  other: {
    "apple-mobile-web-app-capable": "yes",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#1A3A5C",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${nunito.variable} ${lora.variable}`}>
      <body className={nunito.className}>{children}</body>
    </html>
  );
}
