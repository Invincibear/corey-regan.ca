import { BlogHeader } from "@/components/blog/BlogHeader"
import { BlogConfig } from "@/config/blog"

import type { Metadata } from "next"

import "@/styles/blog/globals.css"


export const metadata: Metadata = {
  title:       BlogConfig.name,
  description: BlogConfig.description,
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
