import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Angle Quest — משימת הזוויות",
  description: "משחק אינטראקטיבי ללימוד זוויות עם ממשק מגע.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
