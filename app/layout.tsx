import type { Metadata, Viewport } from "next";
import { Lato, Montserrat } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "JUNHAI - 全球 B2B 批发平台 | 500+ SKU 成人用品批发",
  description: "JUNHAI 是全球领先的 B2B 批发平台，提供 500+ 成人用品 SKU，MOQ 仅需 10 件，批发价低 30-50%，国际认证，隐蔽包装，全球快速物流。",
  keywords: "B2B批发, 成人用品, 批发平台, 零售商, 分销商, 国际贸易, OEM定制",
  other: {
    renderer: "webkit",
    "force-rendering": "webkit",
    "format-detection": "telephone=no,email=no,address=no",
    "x5-orientation": "portrait",
    "screen-orientation": "portrait",
    "x5-page-mode": "app",
    "wap-font-scale": "no",
  },
  metadataBase: new URL("https://junhai-wholesale.com"),
  openGraph: {
    title: "JUNHAI - 全球 B2B 批发平台",
    description: "500+ 产品，超低 MOQ，国际认证，隐蔽包装",
    images: ["/og-image.jpg"],
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${lato.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script id="viewport-fallback" strategy="beforeInteractive">
          {`(function(){
            try {
              var expected = 'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover';
              var meta = document.querySelector('meta[name="viewport"]');
              if (!meta) {
                meta = document.createElement('meta');
                meta.setAttribute('name', 'viewport');
                document.head.appendChild(meta);
              }
              if (meta.getAttribute('content') !== expected) {
                meta.setAttribute('content', expected);
              }
            } catch (e) {}
          })();`}
        </Script>
        <Analytics />
        {children}
      </body>
    </html>
  );
}

