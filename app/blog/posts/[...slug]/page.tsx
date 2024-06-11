import { MDXContent }  from "@/components/blog/MDXContent"
import SocialIcons     from "@/components/SocialIcons"
import { Tag }         from "@/components/tag"
import { BlogConfig }  from "@/config/blog"
import { SocialLinks } from "@/config/links"
import { DOMAIN }      from "@/config/site"
import { formatDate }  from "@/lib/utils"
import { posts }       from "#site/content"
import { Metadata }    from "next"
import Image           from "next/image"
import Link            from "next/link"
import { notFound }    from "next/navigation"

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

  const image = `https://${DOMAIN}/api/og?${ogSearchParams.toString()}`

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
          url:    image,
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
      images:      [image],
    },
  }
}


export async function generateStaticParams(): Promise<PostPageProps["params"][]> {
  return posts.map((post) => ({ slug: post.slugAsParams.split("/") }))
}


export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params)

  if (!post || (process.env.NODE_ENV !== "development" && !post.published)) notFound()

  return (
    <article className="container prose dark:prose-invert py-6 max-w-6xl mx-auto mb-40">
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
            width={1944}
            height={1296}
            className="size-24 object-cover mask mask-parallelogram-4"
          />
        </Link>
        <div className="flex-1 text-left leading-tight">
          <div className="font-medium text-lg my-0 flex">
            Authored by&nbsp;<Link href={SocialLinks.twitter} className="underline hover:text-muted-foreground">Corey
            Regan</Link>
            <div className="flex ml-2">
              <SocialIcons
                className     = "text-xs mt-0 mr-2 size-4"
                linkClassName = "text-muted-foreground hover:text-foreground"
              />
            </div>
          </div>
          <p className="font-medium text-lg my-0">
            Published on {formatDate(post.date)}
          </p>
          <p className="font-medium text-lg my-0">
            {post.readingTime.text}
          </p>
          <div className="text-xs text-muted-foreground mt-0 flex">

          </div>
        </div>
      </div>
      <hr className="my-4"/>

      <MDXContent code={post.body}/>

    </article>
  )
}
