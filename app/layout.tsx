import { ThemeProviders } from "@/components/ThemeProviders"
import { Footer }         from "@/components/Footer"
import { SiteConfig }     from "@/config/site"
import { Inter }          from "next/font/google"

import type { Metadata } from "next"

import "@/styles/globals.css"
import "@/styles/theme.css"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title:       SiteConfig.name,
  description: SiteConfig.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`h-full overflow-x-hidden bg-background text-default text-base ${inter.className}`} data-theme="dark">
        <ThemeProviders>
          {children}
          <Footer />
        </ThemeProviders>
      </body>
    </html>
  )
}
