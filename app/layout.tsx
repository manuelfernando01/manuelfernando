import type React from "react"
import type { Metadata } from "next"
import { Outfit, Syne } from "next/font/google"
import "./globals.css"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Manuel Fernando Gamboa Rocha - Senior Software Engineer | Full Stack & AI",
  description:
    "Portfolio of Manuel Fernando Gamboa Rocha, Senior Software Engineer specializing in full-stack development, distributed systems, and AI-powered products.",
  generator: "Next.js",
  openGraph: {
    title: "Manuel Fernando Gamboa Rocha - Senior Software Engineer | Full Stack & AI",
    description: "Scalable web platforms, distributed systems, and production AI engineering.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manuel Fernando Gamboa Rocha - Senior Software Engineer | Full Stack & AI",
    description: "Scalable web platforms, distributed systems, and production AI engineering.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${syne.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
