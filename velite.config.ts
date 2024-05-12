import rehypeAutolinkHeadings                from "rehype-autolink-headings"
import remarkGfm                             from "remark-gfm"
import rehypePrettyCode                      from "rehype-pretty-code"
import rehypeSlug                            from "rehype-slug"
import { defineConfig, defineCollection, s } from "velite"


const computedFields = <T extends { slug: string }>(data: T) => ({
  ...data,
  slugAsParams: data.slug.split("/").slice(1).join("/"),
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
  pattern: "posts/**/*.mdx",
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


// More plugins available here: https://github.com/remarkjs/remark/blob/HEAD/doc/plugins.md#list-of-plugins
export default defineConfig({
  root:   "content",
  output: {
    assets: "public/static",
    base:   "/static/",
    clean:  true,
    data:   ".velite",
    name:   "[name]-[hash:6].[ext]",
  },
  collections: { posts, authors },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          onVisitLine(node: any) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }]
            }
          },
          onVisitHighlightedLine(node: any) {
            node.properties.className.push("line--highlighted")
          },
          onVisitHighlightedWord(node: any) {
            node.properties.className = ["word--highlighted"]
          },
        },
      ],
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
    ],
    remarkPlugins: [remarkGfm],
  },
})
