import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vistypo - Preview Text with Your Fonts",
  description: "A simple tool to preview text with your local fonts or uploaded font files",
  keywords: ["font", "preview", "typography", "text", "local", "file", "upload"],
  authors: [{ name: "Z3belek", url: "https://github.com/Z3belek" }],
  creator: "Z3belek",
  publisher: "Vistypo",
  openGraph: {
    title: "Vistypo - Preview Text with Your Fonts",
    description: "A simple tool to preview text with your local fonts or uploaded font files",
    url: "https://vistypo.vercel.app",
    type: "website",
    locale: "es_ES",
    images: [
      {
        url: "https://vistypo.vercel.app/og-image.png",
        width: 800,
        height: 420,
        alt: "Vistypo - Preview Text with Your Fonts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vistypo - Preview Text with Your Fonts",
    description: "A simple tool to preview text with your local fonts or uploaded font files",
    creator: "@Vistypo",
    images: [{ url: "https://vistypo.vercel.app/twitter-image.png", alt: "Vistypo - Preview Text with Your Fonts" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    }
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="Vistypo" />
        <meta name="google-site-verification" content="c6enZSxGPlAcPkg1Qxqx3lEdnJJrxE1lzkHeh-LP69g" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
