import { BlogConfig }                        from "@/config/blog"
import { DOMAIN }                            from "@/config/site"
import { copyButtonRawCodeInjector }         from "@/lib/copyButtonRawCodeInjector"
import readingTime                           from "reading-time"
import rehypeAutolinkHeadings                from "rehype-autolink-headings"
import rehypePrettyCode, {Options}           from "rehype-pretty-code"
import rehypeSlug                            from "rehype-slug"
import rehypeStringify                       from "rehype-stringify"
import remarkGfm                             from "remark-gfm"
import { defineConfig, defineCollection, s } from "velite"

// import rehypeAttachRawStringsToCodeContainer from "remark-flexible-code-titles"
import remarkCodeTitles                      from "remark-flexible-code-titles"
// import rehypeEnrichCodeContainerMetadata     from "remark-flexible-code-titles"


const computedFields = <T extends { slug: string }>(data: T) => ({
  ...data,
  readingTime: {
    type:    'json',
    resolve: (doc: any) => readingTime(doc.body.raw),
  },
  slugAsParams: data.slug.split("/").slice(1).join("/"),
  structuredData: {
    type: 'object',
    resolve: (doc: any) => ({
      '@context':    'https://schema.org',
      '@type':       'BlogPosting',
      headline:      doc.title,
      datePublished: doc.publishedAt,
      dateModified:  doc.publishedAt,
      description:   doc.description,
      url:           `https://${DOMAIN}/blog/${doc._raw.flattenedPath}`,
      image: doc.image
        ? `https://${DOMAIN}${doc.image}`
        : `https://${DOMAIN}/og?title=${doc.title}`,
      author: {
        '@type': 'Person',
        name: BlogConfig.author,
      },
    }),
  },
})

const authors = defineCollection({
  name:    "Author",
  pattern: "authors/**/*.mdx",
  schema:  s
            .object({
              slug: s.path(),
              title: s.string().max(99),
              github: s.string().max(999).optional(),
              twitter: s.string().max(999).optional(),
              instagram: s.string().max(999).optional(),
              published: s.boolean().default(true),
            })
            .transform(computedFields),
})

const posts = defineCollection({
  name:    "Post",
  pattern: ["posts/**/*.md", "posts/**/*.mdx"],
  schema:  s
            .object({
              slug: s.path(),
              title: s.string().max(99),
              description: s.string().max(999).optional(),
              date: s.isodate(),
              published: s.boolean().default(true),
              tags: s.array(s.string()).optional(),
              body: s.mdx(),
            })
            .transform(computedFields),
})

const rehypePrettyCodeOptions: Options = {
  keepBackground: false,
  theme:          "github-dark-dimmed",
  defaultLang: {
    block:  "plaintext",
    inline: "",
  },
  onVisitLine(node: any) {
    // Prevents lines from collapsing in `display: grid` mode, and allows empty lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }]
    }
  },
  onVisitHighlightedLine(node: any) {
    node.properties.className.push("line--highlighted")
  },
  onVisitHighlightedChars(node: any) {
    node.properties.className = ["word--highlighted"]
  },
  tokensMap: {
    fn: "entity.name.function",
  },
  transformers: [
    copyButtonRawCodeInjector(),
  ]
}

// More plugins available here: https://github.com/remarkjs/remark/blob/HEAD/doc/plugins.md#list-of-plugins
export default defineConfig({
  root:   "content",
  output: {
    assets: "public/static/",
    base:   "/static/",
    clean:  true,
    data:   ".velite",
    name:   "[name]-[hash:6].[ext]",
  },
  collections: { posts, authors },
  mdx: {
    remarkPlugins: [
      remarkGfm,
      remarkCodeTitles,
    ],
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, rehypePrettyCodeOptions],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
      rehypeStringify,
    ],
  },
})
