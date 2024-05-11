import { MDXContent } from "@/components/blog/mdx-components"
import SocialIcons    from "@/components/SocialIcons"
import { Tag }            from "@/components/tag"
import { BlogConfig }     from "@/config/blog"
import { SocialLinks }    from "@/config/links"
import { cn, formatDate } from "@/lib/utils"
import { posts }          from "#site/content"
import { Metadata }       from "next"
import Image              from "next/image"
import Link               from "next/link"
import { notFound }       from "next/navigation"

import "@/styles/blog/mdx.css"


interface PostPageProps {
  params: {
    slug: string[]
  }
}
async function getPostFromParams(params: PostPageProps["params"]) {
  const slug = params?.slug?.join("/")

  return posts.find((post) => post.slugAsParams === slug)
}


export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params)

  if (!post) return {}

  const ogSearchParams = new URLSearchParams()
  ogSearchParams.set("title", post.title)

  return {
    title:       post.title,
    description: post.description,
    authors:     { name: BlogConfig.author },
    openGraph:   {
      title:       post.title,
      description: post.description,
      type:        "article",
      url:         post.slug,
      images:      [
        {
          url:    `/api/og?${ogSearchParams.toString()}`,
          width:  1200,
          height: 630,
          alt:    post.title,
        },
      ],
    },
    twitter: {
      card:        "summary_large_image",
      title:       post.title,
      description: post.description,
      images:      [`/api/og?${ogSearchParams.toString()}`],
    },
  }
}

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  return posts.map((post) => ({ slug: post.slugAsParams.split("/") }))
}


export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params)

  if (!post || !post.published) {
    notFound()
  }

  return (
    <article className="container prose dark:prose-invert py-6 max-w-6xl mx-auto">
      <h1 className="mb-2 text-3xl">{post.title}</h1>

      <div className="flex gap-2 mb-2">
        {post.tags?.toSorted().map((tag) => (
          <Tag tag={tag} key={tag} />
        ))}
      </div>

      {post.description ? <p className="text-xl my-0 text-muted-foreground">{post.description}</p> : null}

      <div className="flex items-center space-x-2 text-sm no-underline">
        <Link href={SocialLinks.twitter}>
          <Image
            src={BlogConfig.avatar}
            alt="Corey Regan's avatar"
            width={42}
            height={42}
            className="rounded-full bg-white"
          />
        </Link>
        <div className="flex-1 text-left leading-tight">
          <p className="font-medium text-lg my-0">
            Authored by <Link href={SocialLinks.twitter} className="underline">Corey Regan</Link> on {formatDate(post.date)}
          </p>
          <div className="text-xs text-muted-foreground mt-0 flex">
            <SocialIcons className="mr-2 size-4" />
          </div>
        </div>
      </div>
      <hr className="my-4" />

      <MDXContent code={post.body} />

    </article>
  )
}
