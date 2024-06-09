import { posts }     from "@/.velite"
import { PostItem }  from "@/components/blog/PostItem"
import { sortPosts } from "@/lib/utils"
import Link          from "next/link"


interface RecentBlogPostsProps {
  maxPosts?: number
}
export default function RecentBlogPosts({ maxPosts = 3}: RecentBlogPostsProps) {
  const sortedPosts = sortPosts(posts)
  const displayPosts = sortedPosts.slice(0, maxPosts)

  return (
    <section className="pt-40 pb-40 min-w-full bg-background">
      <h3 className="mb-20 text-5xl font-bold text-center text-accent-foreground">Recent Blog Posts</h3>
      <div className="max-w-4xl mx-auto">
        {displayPosts?.length > 0 ? (
          <ul className="flex flex-col">
            {displayPosts.map((post) => {
              const { slug, date, title, description, tags } = post

              return (
                <li key={slug}>
                  <PostItem
                    slug={slug}
                    date={date}
                    title={title}
                    description={description}
                    tags={tags}
                  />
                </li>
              )
            })}
          </ul>
        ) : (
          <p>Nothing to see here yet</p>
        )}
        <h4 className="mt-40 text-2xl font-bold text-center">
          <Link href={"/blog/"} title="View more blog posts" className="text-foreground hover:text-accent-foreground">
            Click here for more blog posts...
          </Link>
        </h4>
      </div>
    </section>
  )
}
