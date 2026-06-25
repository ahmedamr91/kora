import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";

const madrajFont = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-madraj",
  display: "swap",
});

export const metadata: Metadata = {
  title: "مدرج | منصة كرة القدم الذكية",
  description: "منصة عربية حديثة للمباريات، التحليلات، الذاكرة الكروية، والذكاء الاصطناعي.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className={madrajFont.variable}>
      <body>{children}</body>
    </html>
  );
}
