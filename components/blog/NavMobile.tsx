"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button }                            from "@/components/ui/button"
import { BlogConfig }                        from "@/config/blog"
import { SocialLinks }                       from "@/config/links"
import { SiteConfig }                        from "@/config/site"
import { Menu, PawPrint }                    from "lucide-react"
import Link, { LinkProps }                   from "next/link"
import { useRouter }                         from "next/navigation"
import { useState }                          from "react"


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
        <MobileLink onOpenChange={setOpen} href={BlogConfig.url} className="flex items-center">
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
          <Link target="_blank" rel="noreferrer" href={SocialLinks.github}>
            GitHub
          </Link>
          <Link target="_blank" rel="noreferrer" href={SocialLinks.linkedIn}>
            LinkedIn
          </Link>
          <Link target="_blank" rel="noreferrer" href={SocialLinks.twitter}>
            Twitter
          </Link>
          <Link target="_blank" rel="noreferrer" href={SocialLinks.instagram}>
            Instagram
          </Link>
          <Link target="_blank" rel="noreferrer" href={SocialLinks.credly}>
            Credly
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps extends LinkProps {
  children: React.ReactNode
  onOpenChange?: (open: boolean) => void
  className?: string
}
function MobileLink({
  href,
  onOpenChange,
  children,
  className,
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
      className={className}
      {...props}
    >
      {children}
    </Link>
  )
}
