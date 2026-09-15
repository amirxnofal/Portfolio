import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://github.com/amirxnofal"),
  title: "Amir — Backend Engineer | Node.js, Express, MongoDB",
  description:
    "Backend developer building secure & scalable APIs with Node.js. Design, architecture and production code for REST systems — see real repositories, the engineering approach, and how to get in touch.",
  keywords: [
    "backend developer",
    "Node.js",
    "Express",
    "MongoDB",
    "Redis",
    "REST API",
    "Amir",
    "API engineer",
  ],
  authors: [{ name: "Amir Nofal", url: "https://github.com/amirxnofal" }],
  openGraph: {
    title: "Amir — Backend Engineer",
    description:
      "Backend developer building secure & scalable APIs with Node.js. Real systems, public source, engineered with care.",
    url: "https://github.com/amirxnofal",
    siteName: "Amir · Backend Engineer",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amir — Backend Engineer",
    description: "Secure & scalable REST APIs with Node.js.",
  },
};

export const viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        {/* Google Fonts via <link> (App Router has no pages/_document); preconnect keeps the
            request fast and `display=swap` keeps text visible while the fonts load. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-full flex-col bg-[#050505] text-[#f4f4f4]">
        {children}
      </body>
    </html>
  );
}