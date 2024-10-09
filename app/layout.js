import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "./config/site";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

// Font
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    manifest: '/manifest.json',
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    metadataBase: new URL(siteConfig.url),
    description: siteConfig.description,
    keywords: [
        "Pangasinan Translator",
            "Ilocano Translator",
            "Pangasinan",
    ],
    authors: [{
        name: siteConfig.name,
        url: siteConfig.url,
        },
    ],
    creator: siteConfig.authorName,
    openGraph: {
        type: "website",
        locale: "en_PH",
        url: siteConfig.url,
        title: siteConfig.name,
        description: siteConfig.description,
        siteName: siteConfig.name,
        images: [
            {
                url: siteConfig.ogImage,
                width: 1200,
                height: 630,
                alt: siteConfig.name,
            },
            ],
        },
    twitter: {
        card: "summary_large_image",
        title: siteConfig.name,
        description: siteConfig.description,
        images: [siteConfig.ogImage],
        creator: "@trans-speak",
    },
    icons: {
        icon: "/public/LOGO.png",
        apple: "/apple-touch-icon.png",
    },
//   manifest: `${siteConfig.url}/site.webmanifest`,
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
            <meta name="google-site-verification" content="Ah7o-pOZUNHM_1AbkOJkT2hwLzigcQy6Xj4IdAclQA0" />
            </head>
            <body className={`${inter.className}`}>
                {children}
                <SpeedInsights />
                <Analytics />
                <Toaster />
            </body>
        </html>
    )
}

