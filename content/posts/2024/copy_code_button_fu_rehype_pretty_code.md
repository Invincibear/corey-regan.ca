---
title: How To Add A Copy Code Button Compatible With Next.js, MDX, and Rehype-Pretty-Code
date: 2024-06-08
description: Rehype-Pretty-Code by default overwrites custom properties, you have to use the new transformers to pass extra data along.
published: false
tags: ["Next.js", "Rehype", "MDX"]
authors:
  - corey
---

Rehype-pretty-code is really amazing. What's not so amazing is how every other tutorial out there at the time of writing to add a copy code button does not work, all because Rehype obliterates custom properties. Fortunately, they've included a poorly-documented `transformer` feature that allows you to add these properties to tags, allowing us to then find what we need and send them to the user's clipboard.

Here's my file structure. You can swap out `velite` for whatever you're using (like `contentlayer`, etc.), they all write the config the same way:
```bash
.
├── components
│   ├── blog
│   │   ├── BlogHeader.tsx
│   │   ├── CodeBlockHeader.tsx
│   │   ├── CopyButton.tsx
│   │   ├── MDXContent.tsx
│   │   ├── Pre.tsx
├── lib
│   ├── copyButtonRawCodeInjector.tsx
└── velite.config.ts
```


The following will add a `data-raw-code=""` property to your `<code>` tag, which you can confirm by inspecting the `<code>` element in browser dev tools.
`@/lib/copyButtonRawCodeInjector.tsx`:
```tsx
import type { ShikiTransformer } from "shiki"


/**
 * A transformer that adds raw <code> as a data-raw-code property
 *
 * @returns A Shiki transformer
 */
export function copyButtonRawCodeInjector(): ShikiTransformer {
  return {
    name: "copyButtonRawCodeInjector",
    code(node) {
      if (node?.type === "element" && node?.tagName === "code") {
        node.properties['data-raw-code'] = this.source
      }
    },
  }
}
```


Direct Rehype to use the new `copyButtonRawCodeInjector()` function by adding this to your `rehypePrettyCode` options:
`@/velite.config.ts`:
```tsx
import copyButtonRawCodeInjector from "@/lib/copyButtonRawCodeInjector.tsx"
import rehypePrettyCode          from "rehype-pretty-code"


export default defineConfig({
  mdx: {
    rehypePlugins: [
      [
        rehypePrettyCode,
        transformers: [
          copyButtonRawCodeInjector(),
        ],
      ],
    ],
  },
})
```


In my `MDXContents.tsx` file (might be named something different for you), I changed the `<pre>` tag in the list of HTML elements contained in `const components = {}` to point to a dedicated file. I included the other code for you to figure out what the file is on your end, only the `pre: Pre` is needed, in my case my copy button exists in a custom `<CodeBlockHeader>` component, so I'll include it here in my example, tweak it to suit your site.
`@/components/blog/MDXContents.tsx`:
```tsx
import { CodeBlockHeader } from "@/components/blog/CodeBlockHeader"
import { Pre }             from "@/components/blog/Pre"


const useMDXComponent = (code: string) => {
  const fn = new Function(code)

  return fn({ ...runtime }).default
}

const components = {
  pre: Pre,
  CodeBlockHeader,
}

interface MdxProps {
  code: string
}

export function MDXContent({ code }: MdxProps) {
  const Component = useMDXComponent(code)

  return (
    <div className="mdx">
      <Component components={components} />
    </div>
  )
}
```

`@/components/blog/Pre.tsx`:
```tsx
import { CodeBlockHeader } from "@/components/blog/CodeBlockHeader"
import {
  Children,
  HTMLAttributes,
  isValidElement,
  ReactNode,
} from "react"


interface PreProps extends HTMLAttributes<HTMLPreElement> {
  children:           ReactNode
  className:          string
  ['data-raw-code']?: string
}

// https://claritydev.net/blog/copy-to-clipboard-button-nextjs-mdx-rehype
export const Pre = ({
  children,
  ...props
}: PreProps) => {
  let raw_code = ''
  Children.map(children, (child) => {
    if (raw_code == '' && isValidElement(child)) {
      raw_code = (child.props['data-raw-code'] != null) ? child.props['data-raw-code'] : ''
    }
  })

  return (
    <pre
      {...props}
      className="pt-0 overflow-x-auto rounded-t-xl">
      <CodeBlockHeader textToCopy={raw_code} {...props} />
      {children}
    </pre>
  )
}
```

`@/components/blog/CodeBlockHeader.tsx`:
```tsx
import { CopyButton}      from "@/components/blog/CopyButton"
import { HTMLAttributes } from "react"


interface CodeBlockHeaderProps extends HTMLAttributes<HTMLPreElement> {
  textToCopy?:        string
  ['data-language']?: string
}

export const CodeBlockHeader = ({ textToCopy, ...props}: CodeBlockHeaderProps) => {
  return (
    <div className="relative flex w-full justify-between rounded-t-xl bg-gray-300 py-2 px-5 text-sm text-gray-900 dark:bg-slate-900 dark:text-slate-400">
      {props["data-language"]}
      <span className="truncate">{props.title}</span>
      <CopyButton textToCopy={textToCopy}/>
    </div>
  )
}
```


And finally, the copy button itself.
`@/components/blog/CopyButton.tsx`:
```tsx
"use client"

import { ClipboardCopy, ClipboardCheck } from "lucide-react"
import { useState }                      from "react"


// https://claritydev.net/blog/copy-to-clipboard-button-nextjs-mdx-rehype
export const CopyButton = ({ textToCopy }: { textToCopy?: string }) => {
  const [isCopied, setIsCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(textToCopy ?? 'broken')
    setIsCopied(true)

    // Reset copied text after a few seconds
    setTimeout(() => { setIsCopied(false) }, 2500)
  }

  return (
    <button disabled={isCopied} onClick={copy} className="flex items-center font-sans">
      <ClipboardCopy  className={`mr-1 h-4 w-4 ${ isCopied ? "hidden" : ""}`} />
      <ClipboardCheck className={`mr-1 h-4 w-4 ${!isCopied ? "hidden" : ""}`} />
      <span>{isCopied ? "Copied!" : "Copy"}</span>
    </button>
  )
}
```