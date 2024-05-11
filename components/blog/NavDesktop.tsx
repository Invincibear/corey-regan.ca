"use client"

import { BlogConfig }  from "@/config/blog"
import { SiteConfig }  from "@/config/site"
import { cn }          from "@/lib/utils"
import { PawPrint }    from "lucide-react"
import Link            from "next/link"
import { usePathname } from "next/navigation"


export function NavDesktop() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link href={BlogConfig.url} className="mr-6 flex items-center space-x-2">
        <PawPrint className="mr-2 size-6" />
        <span className="font-bold">{BlogConfig.name}</span>
      </Link>
      <Link
        href={SiteConfig.url}
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block",
          pathname === "/" ? "text-foreground" : "text-foreground/60"
        )}
      >
        Portfolio
      </Link>
      <Link
        href={BlogConfig.url}
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block",
          pathname.startsWith("/blog") ? "text-foreground" : "text-foreground/60"
        )}
      >
        Blog
      </Link>
    </nav>
  )
}
