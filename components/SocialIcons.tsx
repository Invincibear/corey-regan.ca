import { SocialLinks }     from "@/config/links"
import { Award, Linkedin } from "lucide-react"
import Link                from "next/link"
import {
  SiGithub,
  SiInstagram,
  SiTwitter
} from "@icons-pack/react-simple-icons"


interface SocialIconsProps {
  className?:     string | undefined
  linkClassName?: string | undefined
}
export default function SocialIcons({ className = "size-6", linkClassName }: SocialIconsProps) {
  return (
    <>
      <Link target="_blank" rel="noreferrer" href={SocialLinks.github} title="Check out my GitHub repos" className={linkClassName}>
        <span className="sr-only">GitHub</span>
        <SiGithub className={className} />
      </Link>
      <Link target="_blank" rel="noreferrer" href={SocialLinks.linkedIn} title="Check out my work history on LinkedIn" className={linkClassName}>
        <span className="sr-only">LinkedIn</span>
        <Linkedin className={className} />
      </Link>
      <Link target="_blank" rel="noreferrer" href={SocialLinks.twitter} title="Read my Twitter thoughts" className={linkClassName}>
        <span className="sr-only">Twitter</span>
        <SiTwitter className={className} />
      </Link>
      <Link target="_blank" rel="noreferrer" href={SocialLinks.instagram} title="Check out my Insta" className={linkClassName}>
        <span className="sr-only">Instagram</span>
        <SiInstagram className={className} />
      </Link>
      <Link target="_blank" rel="noreferrer" href={SocialLinks.credly} title="Check out my IT certifications" className={linkClassName}>
        <span className="sr-only">Credly</span>
        <Award className={className} />
      </Link>
    </>
  )
}
