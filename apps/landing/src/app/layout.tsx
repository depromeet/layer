import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header, Footer } from "@/components/ui";
import { isPublicSite, siteDescription, siteTitle, siteUrl } from "@/lib/site";
import "./globals.css";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: siteTitle, template: "%s | 레이어 Layer" },
  description: siteDescription,
  applicationName: "레이어 Layer",
  robots: { index: isPublicSite, follow: isPublicSite },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "레이어 Layer",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "회고를 다음 행동으로, 레이어",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={pretendard.variable} data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main">
          본문으로 바로가기
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
