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
