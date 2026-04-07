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
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "PCC Companion",
    startupImage: "/icons/icon-512.png",
  },
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },
  formatDetection: {
    telephone: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#1A3A5C",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${nunito.variable} ${lora.variable}`}>
      <body className={nunito.className}>{children}</body>
    </html>
  );
}
