import SocialIcons           from "@/components/SocialIcons"
import { FooterToggleTheme } from "@/components/FooterToggleTheme"
import { SiteConfig }        from "@/config/site"
import { Sparkles }          from "lucide-react"


export function Footer() {
  return (
    <footer className="footer py-28 px-10 bg-accent-background text-content text-md">
      <aside>
        <Sparkles width={50} height={50} className="text-accent-foreground" />
        <p>
          <span className="footer-title text-accent-foreground">{SiteConfig.name}</span>
          <br/>
          {SiteConfig.description}
        </p>
      </aside>
      <nav>
        <h6 className="footer-title text-accent-foreground">Social</h6>
        <div className="grid grid-flow-col gap-4 pt-3">
          <SocialIcons className="transform hover:-translate-y-1" />
        </div>
      </nav>
      <aside>
        <h6 className="footer-title text-accent-foreground">Site Theme</h6>
        <FooterToggleTheme />
      </aside>
    </footer>
  )
}
