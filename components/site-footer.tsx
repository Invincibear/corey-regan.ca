import { siteConfig } from "@/config/site"
import { Icons }      from "@/components/icons"
import Link           from "next/link";

export function SiteFooter() {
  return (
    <footer>
      <div className="mb-6 mt-14 flex flex-col items-center">
        <p className="mb-4 text-lg font-bold text-center">
          <Link href={siteConfig.blogUrl}>
            Check out my IT blog!
          </Link>
        </p>
        <div className="mb-3 flex space-x-4">
          {/*          <a target="_blank" rel="noreferrer" href={`mailto:${siteConfig.links.email}`}>
           <span className="sr-only">Mail</span>
           <Mail className="h-6 w-6" />
           </a>*/}
          <a target="_blank" rel="noreferrer" href={siteConfig.links.github}>
            <span className="sr-only">GitHub</span>
            <Icons.gitHub className="h-6 w-6"/>
          </a>
          <a target="_blank" rel="noreferrer" href={siteConfig.links.linkedIn}>
            <span className="sr-only">LinkedIn</span>
            <Icons.linkedIn className="h-6 w-6"/>
          </a>
          <a target="_blank" rel="noreferrer" href={siteConfig.links.twitter}>
            <span className="sr-only">Twitter</span>
            <Icons.twitter className="h-6 w-6"/>
          </a>
          <a target="_blank" rel="noreferrer" href={siteConfig.links.instagram}>
            <span className="sr-only">Instagram</span>
            <Icons.instagram className="h-6 w-6"/>
          </a>
          <a target="_blank" rel="noreferrer" href={siteConfig.links.credly}>
            <span className="sr-only">Credly</span>
            <Icons.credly className="h-6 w-6"/>
          </a>
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-muted-foreground">
          <a href={siteConfig.links.personalSite} target="_blank">
            &copy;2024 {siteConfig.author}
          </a>
        </div>
      </div>
    </footer>
  )
}
