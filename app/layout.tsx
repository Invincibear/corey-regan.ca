import { Inter } from "next/font/google"

import type { Metadata } from "next"

import "@/styles/global.css"
import "@/styles/theme.css"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Corey Regan's Portfolio",
  description: "A collection of my years in IT, from full-stack dev, to DevOps, to SRE",
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
      </body>
    </html>
  )
}
