import { posts }           from "#site/content"
import { PostItem }        from "@/components/blog/PostItem"
import { QueryPagination } from "@/components/blog/QueryPagination"
import { Tag }             from "@/components/tag"
import { badgeVariants }   from "@/components/ui/badge"
import { BlogConfig }      from "@/config/blog"
import { Metadata }        from "next"
import Link                from "next/link"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  getAllTags,
  sortPosts,
  sortTagsAlphabetically,
  sortTagsByCount,
} from "@/lib/utils"


export const metadata: Metadata = {
  title:       BlogConfig.name,
  description: BlogConfig.description,
}


const POSTS_PER_PAGE = BlogConfig.postPerPage


interface BlogPageProps {
  params: {
    sortedBy: string
  },
  searchParams: {
    page?: string
  },
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const { sortedBy } = params
  const currentPage = Number(searchParams?.page) || 1
  const sortedPosts = sortPosts(posts.filter((post) => post.published))
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE)

  const displayPosts = sortedPosts.slice(
    POSTS_PER_PAGE * (currentPage - 1),
    POSTS_PER_PAGE * currentPage,
  )

  const tags = getAllTags(posts)
  const sortedTagsByCount = sortTagsByCount(tags)
  const sortedTagsAlphabetically = sortTagsAlphabetically(tags)
  const sortedTags = sortedBy === "count"
    ? sortedTagsByCount
    : sortedTagsAlphabetically

  return (
    <div className="container max-w-6xl py-6 lg:py-10 mb-40">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-black text-4xl lg:text-5xl text-accent-foreground">{BlogConfig.name}</h1>
          <p className="text-xl text-muted-foreground">
            {BlogConfig.description}
          </p>
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
            : (<p>Nothing to see here, yet...</p>)
          }
          <QueryPagination totalPages={totalPages} className="justify-end mt-4" />
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
                href      = {`/blog/sort/count${currentPage != 1 ? '?page=' + currentPage : ''}`}
                className = {badgeVariants({
                  variant:   sortedBy === "count" ? "default" : "secondary",
                  className: "no-underline rounded-none",
                })}
              >
                Sort by count
              </Link>
              <Link
                href      = {`/blog/sort/alphabetically${currentPage != 1 ? '?page=' + currentPage : ''}`}
                className = {badgeVariants({
                  variant:   sortedBy === "alphabetically" ? "default" : "secondary",
                  className: "no-underline rounded-none",
                })}
              >
                Sort alphabetically
              </Link>
            </div>
            <hr className="my-4"/>
            {sortedTags?.map((tag) => (
              <Tag tag={tag} key={tag} count={tags[tag]} sortedBy={sortedBy}/>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
