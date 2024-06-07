import { CopyButton }                from "@/components/blog/CopyButton"
import { cn }                        from "@/lib/utils"
import { HTMLAttributes, ReactNode } from "react"


interface PreProps extends HTMLAttributes<HTMLPreElement> {
  children:           ReactNode
  raw:                string
  className:          string
  ['data-language']?: string
}

// https://claritydev.net/blog/copy-to-clipboard-button-nextjs-mdx-rehype
export const Pre = ({
  children,
  raw,
  className,
  ...props
}: PreProps) => {
  const lang = props["data-language"]

  return (
    <pre {...props} className={cn(
      "pt-0 overflow-x-auto rounded-t-xl",
      className
      )
    }>
      <div
        className="relative flex w-full justify-between rounded-t-xl bg-gray-300 py-2 px-5 text-sm text-gray-900 dark:bg-slate-900 dark:text-slate-400"
      >
        {lang}
        <CopyButton text={raw} />
      </div>
      {children}
    </pre>
  )
}
