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
