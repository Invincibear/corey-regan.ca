export const DOMAIN = process.env.NODE_ENV === 'development'
  ? 'localhost'
  : 'corey-regan.ca'

export const SiteConfig = {
  author:      "Corey Regan",
  avatar:      "/images/avatars/corey.png",
  description: "A showcase of the skills I've picked up over the years",
  name:        "Corey Regan's Portfolio",
  url:         `/`,
  postPerPage: 10,
}

export type SiteConfig = typeof SiteConfig
