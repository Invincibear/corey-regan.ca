"use client"

import { ClipboardCopy, ClipboardCheck } from "lucide-react"
import { useState }                      from "react"


// https://claritydev.net/blog/copy-to-clipboard-button-nextjs-mdx-rehype
export const CodeBlockCopyButton = ({ textToCopy }: { textToCopy?: string }) => {
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
