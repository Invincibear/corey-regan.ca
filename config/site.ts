const handles = {
  github:    "Invincibear",
  instagram: "Invincibear",
  linkedIn:  "regancorey",
  twitter:   "Invincibear",
}

export const siteConfig = {
  author:      "Corey Regan",
  avatar:      "/images/avatars/corey.png",
  description: "A showcase of the skills I've picked up over the years",
  name:        "Corey Regan's Portfolio",
  url:         "https://corey-regan.ca/",
  postPerPage: 10,

  handles: {
    github:    handles.github,
    instagram: handles.instagram,
    linkedIn:  handles.linkedIn,
    twitter:   handles.twitter,
  },

  links: {
    credly:       'https://www.credly.com/users/corey-regan/badges',
    email:        'portfolio@corey-regan.ca',
    github:       `https://github.com/${handles.github}`,
    linkedIn:     `https://linkedin.com/in/${handles.linkedIn}`,
    instagram:    `https://instagram.com/${handles.instagram}`,
    personalSite: `https://corey-regan.ca`,
    twitter:      `https://twitter.com/${handles.twitter}`,
  },
};

export type SiteConfig = typeof siteConfig;
