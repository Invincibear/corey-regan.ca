import { HTMLAttributes, ReactNode } from "react"


interface PreProps extends HTMLAttributes<HTMLPreElement> {
  children:           ReactNode
  raw:                any,
  className:          string
}

export const Figure = ({
  children,
  className,
  ...props
}: PreProps) => {
  return (
    <figure {...props} className={className}>
      {children}
    </figure>
  )
}
