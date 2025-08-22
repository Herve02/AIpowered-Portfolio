import type React from "react"
import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  title: "Twubahimana Herve - Full-Stack Developer",
  description:
    "Portfolio of Twubahimana Herve - Full-Stack Developer specializing in ReactJS, Next.js, and modern web technologies. Available for freelance projects and full-time opportunities.",
  keywords: [
    "Full-Stack Developer",
    "ReactJS",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "Web Development",
    "Frontend",
    "Backend",
    "Portfolio",
  ],
  authors: [{ name: "Twubahimana Herve" }],
  creator: "Twubahimana Herve",
  publisher: "Twubahimana Herve",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://herve-portfolio.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Twubahimana Herve - Full-Stack Developer",
    description:
      "Portfolio showcasing modern web development projects and expertise in ReactJS, Next.js, and cutting-edge technologies.",
    url: "https://herve-portfolio.vercel.app",
    siteName: "Twubahimana Herve Portfolio",
    images: [
      {
        url: "/professional-developer-portrait.png",
        width: 1200,
        height: 630,
        alt: "Twubahimana Herve - Full-Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Twubahimana Herve - Full-Stack Developer",
    description:
      "Portfolio showcasing modern web development projects and expertise in ReactJS, Next.js, and cutting-edge technologies.",
    images: ["/professional-developer-portrait.png"],
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
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={dmSans.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#ea580c" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="font-sans antialiased scroll-smooth">{children}</body>
    </html>
  )
}
