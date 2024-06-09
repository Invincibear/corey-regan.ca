import { type ClassValue, clsx } from "clsx"
import { twMerge }               from "tailwind-merge"
import { Post }                  from "#site/content"
import { slug }                  from "github-slugger"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatDate(input: string | number): string {
  const date = new Date(input)
  const pacificTime = new Date(new Date(date).setHours(date.getHours() + 8))

  return pacificTime.toLocaleDateString("en-US", {
    month: "long",
    day:   "numeric",
    year:  "numeric",
  })
}


export function sortPosts(posts: Array<Post>) {
  posts = (process.env.NODE_ENV !== "development")
    ? posts.filter(post => post.published)
    : posts

  return posts
    .sort((a, b) => {
    if (a.date > b.date) return -1
    if (a.date < b.date) return 1
    return 0
  })
}


export function getAllTags(posts: Array<Post>) {
  const tags: Record<string, number> = {}

  posts = (process.env.NODE_ENV !== "development")
  ? posts.filter(post => post.published)
  : posts

  posts
    .flatMap(post => post.tags ?? [])
    .forEach(tag => {
      tags[tag] = (tags[tag] ?? 0) + 1
    })

  return tags
}


export function sortTagsByCount(tags: Record<string, number>): string[] {
  return Object.keys(tags).sort((a, b) => tags[b] - tags[a])
}

export function sortTagsAlphabetically(tags: Record<string, number>): string[] {
  return Object.keys(tags).toSorted((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }))
}


export function getPostsByTagSlug(posts: Array<Post>, tag: string) {
  return posts
    .filter(post => post.published)
    .filter(post => {
      if (!post.tags) return false

      const sluggedTags = post.tags.map(tag => slug(tag))

      return sluggedTags.includes(tag)
    })
}


export function toTitleCase(phrase: string) {
  return phrase
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}


export function isFilename(str: string): boolean {
  const filenameRegex = /[^\/\\]+\.[a-zA-Z0-9]+$/

  return filenameRegex.test(str)
}
