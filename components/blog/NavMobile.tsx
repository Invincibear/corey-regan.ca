"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button }                            from "@/components/ui/button"
import { BlogConfig }                        from "@/config/blog"
import { SocialLinks }                       from "@/config/links"
import { SiteConfig }                        from "@/config/site"
import { Menu, PawPrint }                    from "lucide-react"
import Link, { LinkProps }                   from "next/link"
import { useRouter }                           from "next/navigation"
import { HTMLAttributeAnchorTarget, useState } from "react"


export function NavMobile() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-10 px-0 sm:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Theme</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <MobileLink onOpenChange={setOpen} href={BlogConfig.url} className="flex items-center hover:pl-0">
          <PawPrint className="mr-2 size-4" />
          <span className="font-bold">{BlogConfig.name}</span>
        </MobileLink>
        <div className="flex flex-col gap-3 mt-3">
          <MobileLink onOpenChange={setOpen} href={BlogConfig.url}>
            {BlogConfig.name}
          </MobileLink>
          <MobileLink onOpenChange={setOpen} href={SiteConfig.url}>
            {SiteConfig.name}
          </MobileLink>
          <MobileLink target="_blank" rel="noreferrer" href={SocialLinks.github}>
            GitHub
          </MobileLink>
          <MobileLink target="_blank" rel="noreferrer" href={SocialLinks.linkedIn}>
            LinkedIn
          </MobileLink>
          <MobileLink target="_blank" rel="noreferrer" href={SocialLinks.twitter}>
            Twitter
          </MobileLink>
          <MobileLink target="_blank" rel="noreferrer" href={SocialLinks.instagram}>
            Instagram
          </MobileLink>
          <MobileLink target="_blank" rel="noreferrer" href={SocialLinks.credly}>
            Credly
          </MobileLink>
        </div>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps extends LinkProps {
  children:      React.ReactNode
  className?:    string
  onOpenChange?: (open: boolean) => void
  rel?:          string | undefined
  target?:       HTMLAttributeAnchorTarget
}
function MobileLink({
  href,
  children,
  className,
  onOpenChange,
  rel,
  target,
  ...props
}: MobileLinkProps) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={`hover:text-accent-foreground hover:underline hover:pl-1 ${className}`}
      rel={rel}
      target={target}
      {...props}
    >
      {children}
    </Link>
  )
}
