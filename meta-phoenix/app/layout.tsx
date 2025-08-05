import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Suspense } from "react"
import { Header } from "@/components/header"
import { FloatingChatbot } from "@/components/floating-chatbot"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Meta Phoenix Tech - Cybersecurity Solutions in Eswatini",
  description:
    "Leading cybersecurity research and solutions provider in Eswatini. Advanced threat detection, network security, and digital protection services.",
  keywords: "cybersecurity, threat detection, network security, Eswatini, digital protection, security research",
  authors: [{ name: "Meta Phoenix Tech" }],
  openGraph: {
    title: "Meta Phoenix Tech - Securing the Digital Frontier",
    description:
      "Advanced cybersecurity solutions and pioneering research to protect your digital assets from evolving threats.",
    type: "website",
    locale: "en_US",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black min-h-screen`}>
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <FloatingChatbot />
          <Analytics />
          <SpeedInsights />
        </Suspense>
      </body>
    </html>
  )
}
