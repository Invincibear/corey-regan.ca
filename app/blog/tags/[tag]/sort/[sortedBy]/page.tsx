import { posts }       from "@/.velite"
import { PostItem }    from "@/components/PostItem"
import { Tag }         from "@/components/tag"
import {badgeVariants} from "@/components/ui/badge"
import { slug }        from "github-slugger"
import { Metadata }    from "next"
import Link            from "next/link"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  getAllTags,
  getPostsByTagSlug,
  sortTagsAlphabetically,
  sortTagsByCount,
  toTitleCase,
} from "@/lib/utils"


export const generateStaticParams = () => {
  const tags = getAllTags(posts)

  return Object.keys(tags).map((tag) => ({ tag: slug(tag) }))
}


interface TagPageProps {
  params: {
    tag:      string,
    sortedBy: string,
  }
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = params

  return {
    title:       `${toTitleCase(tag)} Blog Posts By Corey Regan`,
    description: `Posts on the topic of ${tag}`,
  }
}

export default function TagPage({ params }: TagPageProps) {
  const { tag, sortedBy } = params
  const title = tag.split("-").join(" ")

  const allPosts = getPostsByTagSlug(posts, tag)
  const displayPosts = allPosts.filter(post => post.published)

  const currentTag = tag
  const tags = getAllTags(posts)
  const sortedTagsByCount = sortTagsByCount(tags)
  const sortedTagsAlphabetically = sortTagsAlphabetically(tags)
  const sortedTags = sortedBy === "count"
    ? sortedTagsByCount
    : sortedTagsAlphabetically

  return (
    <div className="container max-w-6xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-black text-4xl lg:text-5xl capitalize text-accent-foreground">
            {title}
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3 mt-8">
        <div className="col-span-12 col-start-1 sm:col-span-8">
          <hr />
          {displayPosts?.length > 0
            ? (
              <ul className="flex flex-col">
                {displayPosts.map((post) => {
                  const { slug, date, title, description, tags } = post

                  return (
                    <li key={slug}>
                      <PostItem
                        slug        = {slug}
                        date        = {date}
                        title       = {title}
                        description = {description}
                        tags        = {tags}
                      />
                    </li>
                  )
                })}
              </ul>
            )
            : ( <p>Nothing to see here, yet...</p> )
          }
        </div>
        <Card className="col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1">
          <CardHeader>
            <CardTitle>
              <Link href={"/blog/tags"}>Tags</Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <div className="flex flex-wrap gap-2 text-xs">
              <Link
                href={"/blog/tags/[tag]/sort/count"}
                as={`/blog/tags/${tag}/sort/count`}
                className={badgeVariants({
                  variant: sortedBy === "count" ? "default" : "secondary",
                  className: "no-underline rounded-none",
                })}
              >
                Sort by count
              </Link>
              <Link
                href={"/blog/tags/[tag]/sort/alphabetically"}
                as={`/blog/tags/${tag}/sort/alphabetically`}
                className={badgeVariants({
                  variant: sortedBy === "alphabetically" ? "default" : "secondary",
                  className: "no-underline rounded-none",
                })}
              >
                Sort alphabetically
              </Link>
            </div>
            <hr/>
            <div className="flex flex-wrap gap-2">
              {sortedTags?.map((tag) => (
                <Tag
                  tag={tag}
                  current={tag.toLowerCase() === currentTag.toLowerCase()}
                  key={tag}
                  count={tags[tag]}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
)
}
