import { posts }         from "#site/content"
import { Tag }           from "@/components/tag"
import { badgeVariants } from "@/components/ui/badge"
import { BlogConfig }    from "@/config/blog"
import { Metadata }      from "next"
import Link              from "next/link"
import {
  getAllTags,
  sortTagsAlphabetically,
  sortTagsByCount,
} from "@/lib/utils"



export const metadata: Metadata = {
  title:       `${BlogConfig.name} Posts Sorted By Tags`,
  description: BlogConfig.description,
}

export default async function TagsPage() {
  const tags = getAllTags(posts)
  const sortedTagsByCount = sortTagsByCount(tags)
  const sortedTagsAlphabetically = sortTagsAlphabetically(tags)
  const sortedByTags = true

  let sortedTags = sortedByTags
    ? sortedTagsByCount
    : sortedTagsAlphabetically

  return (
    <div className="container max-w-6xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-black text-4xl lg:text-5xl text-accent-foreground">Tags</h1>
        </div>
      </div>
      <hr className="my-4"/>
      <div className="flex flex-wrap gap-2 text-xs">
        <Link
          href      = {"/blog/tags/sort/count"}
          className = {badgeVariants({
            variant:   sortedByTags ? "default" : "secondary",
            className: "no-underline rounded-none",
          })}
        >
          Sort by count
        </Link>
        <Link
          href      = {"/blog/tags/sort/alphabetically"}
          className = {badgeVariants({
            variant:   !sortedByTags ? "default" : "secondary",
            className: "no-underline rounded-none",
          })}
        >
          Sort alphabetically
        </Link>
      </div>
      <hr className="my-4"/>
      <div className="flex flex-wrap gap-2">
        {sortedTags?.map((tag) => (
          <Tag tag={tag} count={tags[tag]} key={tag}/>
        ))}
      </div>
    </div>
  )
}
