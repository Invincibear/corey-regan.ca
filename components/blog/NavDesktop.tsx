"use client"

import { BlogConfig }  from "@/config/blog"
import { SiteConfig }  from "@/config/site"
import { cn }          from "@/lib/utils"
import { Sparkles }    from "lucide-react"
import Link            from "next/link"
import { usePathname } from "next/navigation"


export function NavDesktop() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6 text-black">
      <Link href={BlogConfig.url} className="mr-6 flex items-center space-x-2 hover:text-primary">
        <Sparkles className="mr-2 size-6 text-foreground" />
        <span className="font-bold text-accent-foreground">{BlogConfig.name}</span>
      </Link>
      <Link
        href={SiteConfig.url}
        className={cn(
          "text-sm transition-colors hover:text-primary hidden sm:inline-block",
          pathname === "/" ? "text-foreground font-bold" : "text-foreground/60 font-medium"
        )}
      >
        Portfolio
      </Link>
      <Link
        href={BlogConfig.url}
        className={cn(
          "text-sm font-bold transition-colors hover:text-primary hidden sm:inline-block",
          pathname.startsWith("/blog") ? "text-foreground font-bold" : "text-foreground/60 font-medium"
        )}
      >
        Blog
      </Link>
    </nav>
  )
}
