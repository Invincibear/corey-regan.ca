import { CodeBlockCopyButton }       from "@/components/blog/CodeBlockCopyButton"
import { isFilename }                from "@/lib/utils"
import { HTMLAttributes, ReactNode } from "react"


interface FigCaptionProps extends HTMLAttributes<HTMLElement> {
  children:                           ReactNode
  className?:                         string
  textToCopy?:                        string
  ['data-rehype-pretty-code-title']?: string
  ['data-language']?:                 string
  ['data-theme']?:                    string
  ['data-raw-code']?:                 string
}

const defaultClassNames: string = ''

export const FigCaption = ({
  children,
  className = defaultClassNames,
  textToCopy = 'error',
  ...props
}: FigCaptionProps) => {
  // console.debug({props: props, textToCopy: textToCopy})

  const codeBlockTitle = 'data-rehype-pretty-code-title' in props
    ? children
    : ''
  const codeBlockLanguage = props["data-language"]
    ? `${props["data-language"]}${codeBlockTitle != ' ' ? ':' : ''}`
    : ''
  const codeBlockTitleStyled = isFilename(`${codeBlockTitle}`)
    ? (
      <span className="relative px-1 font-mono text-sm not:prose">
        {codeBlockTitle}
      </span>
    )
    : <span className="truncate">{codeBlockTitle}</span>

  return (
    <figcaption
      {...props}
      className                     = {className}
      // data-rehype-pretty-code-title = {codeBlockTitle}
      data-language                 = {props['data-language']}
      data-theme                    = {props['data-theme']}
      // data-raw-code                 = {textToCopy} // To avoid clicking copy/paste to verify it works
    >
      <span>
        <span className="font-bold mr-1">{codeBlockLanguage}</span>
        {codeBlockTitleStyled}
      </span>
      <CodeBlockCopyButton textToCopy={textToCopy}/>
    </figcaption>
  )
}

// <code class="relative rounded-b-xl px-[0.3rem] py-[0.2rem] font-mono text-sm not:prose">contents_go_here</code>
