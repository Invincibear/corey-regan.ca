import { siteConfig } from "@/config/site"
import Link           from "next/link"
import {
  Award,
  Github,
  Instagram,
  Linkedin,
  PawPrint,
  Twitter,
} from "lucide-react"


export function SiteFooter() {
  return (
    <footer className="footer mt-40 py-28 px-10 bg-white text-accent-content text-md">
      <aside>
        <PawPrint width={50} height={50} />
        <p>
          {siteConfig.name}
          <br/>
          {siteConfig.description}
        </p>
      </aside>
      <nav>
        <h6 className="footer-title">Social</h6>
        <div className="grid grid-flow-col gap-4">
          <Link target="_blank" rel="noreferrer" href={siteConfig.links.github}>
            <span className="sr-only">GitHub</span>
            <Github className="h-6 w-6"/>
          </Link>
          <Link target="_blank" rel="noreferrer" href={siteConfig.links.linkedIn}>
            <span className="sr-only">LinkedIn</span>
            <Linkedin className="h-6 w-6"/>
          </Link>
          <Link target="_blank" rel="noreferrer" href={siteConfig.links.twitter}>
            <span className="sr-only">Twitter</span>
            <Twitter className="h-6 w-6"/>
          </Link>
          <Link target="_blank" rel="noreferrer" href={siteConfig.links.instagram}>
            <span className="sr-only">Instagram</span>
            <Instagram className="h-6 w-6"/>
          </Link>
          <Link target="_blank" rel="noreferrer" href={siteConfig.links.credly}>
            <span className="sr-only">Credly</span>
            <Award className="h-6 w-6"/>
          </Link>
        </div>
      </nav>
      <aside>
        <h6 className="footer-title">Problem Solving</h6>
        <Link target="_blank" rel="noreferrer" href="/blog" className="underline">
          Click here to check out my blog!
        </Link>
      </aside>
    </footer>
  )
}
