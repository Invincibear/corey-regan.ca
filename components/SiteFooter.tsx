import SocialIcons          from "@/components/SocialIcons"
import { ToggleThemeIcons } from "@/components/ToggleThemeIcons"
import { SiteConfig }       from "@/config/site"
import { PawPrint }         from "lucide-react"


export function SiteFooter() {
  return (
    <footer className="footer mt-40 py-28 px-10 bg-white text-accent-content text-md">
      <aside>
        <PawPrint width={50} height={50} />
        <p>
          {SiteConfig.name}
          <br/>
          {SiteConfig.description}
        </p>
      </aside>
      <nav>
        <h6 className="footer-title">Social</h6>
        <div className="grid grid-flow-col gap-4 pt-3">
          <SocialIcons className="transform hover:-translate-y-1" />
        </div>
      </nav>
      <aside>
        <h6 className="footer-title">Site Theme</h6>
        <ToggleThemeIcons />
      </aside>
    </footer>
  )
}
