"use client"

import { useState } from "react"


// https://claritydev.net/blog/copy-to-clipboard-button-nextjs-mdx-rehype
export const CopyButton = ({ text }: { text: string }) => {
  const [isCopied, setIsCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setIsCopied(true)

    setTimeout(() => { setIsCopied(false) }, 10000)
  }

  return (
    <button disabled={isCopied} onClick={copy}>
      {isCopied ? "Copied!" : "Copy"}
    </button>
  )
}
