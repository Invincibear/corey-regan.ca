import { NavDesktop }  from "@/components/blog/NavDesktop"
import { NavMobile }   from "@/components/blog/NavMobile"
import SocialIcons     from "@/components/SocialIcons"
import { ToggleTheme } from "@/components/ToggleTheme"


export function BlogHeader() {
  return (
    <header className="z-10 sticky top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <NavDesktop />
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center">
            <SocialIcons className="size-5 mr-2 hidden sm:block" />
            <div className="ml-6 mr-4 sm:mr-0">
              <ToggleTheme />
            </div>
            <NavMobile />
          </nav>
        </div>
      </div>
    </header>
  )
}
