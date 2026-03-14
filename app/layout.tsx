import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/lib/theme-provider"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "Syafaruddin - Software Engineer",
  description: "Software Engineer showcasing projects and experience",
  generator: "v0.app",
  metadataBase: new URL("https://syafar.vercel.app"),
  openGraph: {
    title: "Syafaruddin - Software Engineer",
    description: "Software Engineer showcasing projects and experience",
    url: "https://syafar.vercel.app",
    siteName: "Portofolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 759,
        alt: "Preview portofolio syafar",
      },
    ],
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
