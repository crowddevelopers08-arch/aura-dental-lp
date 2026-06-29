import type { Metadata } from "next";
import { Manrope, Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-outfit",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-manrope",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Aura Dental | Advanced Dental Implant Centre – Hyderabad",
  description:
    "Restore your smile with permanent, natural-looking dental implants at Aura Dental, Hyderabad. Expert Implantologist & Prosthodontist with 12+ years of experience. Advanced 3D implant planning & digital technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body
        className={`${manrope.variable} ${playfair.variable} ${outfit.variable} font-body selection:bg-[#1D4231] selection:text-[#D3BB71]`}
      >
        {children}
      </body>
    </html>
  );
}
