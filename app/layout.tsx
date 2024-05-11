import { SiteFooter } from "@/components/site-footer-daisy"
import { siteConfig } from "@/config/site"
import { Inter }      from "next/font/google"

import type { Metadata } from "next"

import "@/styles/global.css"
import "@/styles/theme.css"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title:       siteConfig.name,
  description: siteConfig.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`h-full select-none overflow-x-hidden bg-default text-default text-base ${inter.className}`} data-theme="dark">
        {children}
        <SiteFooter />
      </body>
    </html>
  )
}
