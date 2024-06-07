import rehypeAutolinkHeadings                from "rehype-autolink-headings"
import rehypePrettyCode                      from "rehype-pretty-code"
import rehypeSlug                            from "rehype-slug"
import remarkGfm                             from "remark-gfm"
import { visit }                             from "unist-util-visit"
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
      () => (tree) => { // https://claritydev.net/blog/copy-to-clipboard-button-nextjs-mdx-rehype
        visit(tree, (node) => {
          if (node?.type === "element" && node?.tagName === "pre") {
            const [codeEl] = node.children

            if (codeEl.tagName !== "code") return

            node.raw = codeEl.children?.[0].value
          }
        })
      },
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          // theme: {
          //   dark:  "github-dark",
          //   light: "github-light",
          // },
          onVisitLine(node: any) {
            // Prevents lines from collapsing in `display: grid` mode, and allows empty lines to be copy/pasted
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
      () => (tree) => { // https://claritydev.net/blog/copy-to-clipboard-button-nextjs-mdx-rehype
        visit(tree, (node) => {
          if (node?.type === "element" && node?.tagName === "div") {
            if (!("data-rehype-pretty-code-fragment" in node.properties)) {
              return
            }

            for (const child of node.children) {
              if (child.tagName === "pre") {
                child.properties["raw"] = node.raw
              }
            }
          }
        })
      },
    ],
    remarkPlugins: [remarkGfm],
  },
})
