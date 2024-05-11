import { SocialHandles }      from "@/config/handles"
import { DOMAIN, SiteConfig } from "@/config/site"


export const SocialLinks = {
  credly:       'https://www.credly.com/users/corey-regan/badges',
  email:        `portfolio@${DOMAIN}`,
  github:       `https://github.com/${SocialHandles.github}`,
  linkedIn:     `https://linkedin.com/in/${SocialHandles.linkedIn}`,
  instagram:    `https://instagram.com/${SocialHandles.instagram}`,
  personalSite: SiteConfig.url,
  twitter:      `https://twitter.com/${SocialHandles.twitter}`,
}

export type SocialLinks = typeof SocialLinks
