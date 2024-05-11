import { ThemeProviders } from "@/components/ThemeProviders"
import { BlogHeader }     from "@/components/blog/BlogHeader"
import { BlogConfig }     from "@/config/blog"
import { cn }             from "@/lib/utils"
import { Inter }          from "next/font/google"

import type { Metadata, Viewport } from "next"

import "@/styles/blog/globals.css"


const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title:        BlogConfig.name,
  description:  BlogConfig.description,
  // metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? BlogConfig.url),
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)",  color: "black" },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative flex min-h-dvh flex-col bg-background">
      <BlogHeader />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
