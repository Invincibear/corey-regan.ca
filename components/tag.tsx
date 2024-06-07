import { badgeVariants } from "@/components/ui/badge"
import { slug }          from "github-slugger"
import Link              from "next/link"


interface TagProps {
  tag:       string
  current?:  boolean
  count?:    number
  sortedBy?: string
}

export function Tag({ tag, current, count, sortedBy }: TagProps) {
  return (
    <Link
      className={badgeVariants({
        variant:   current ? "default" : "secondary",
        className: "no-underline rounded-md",
      })}
      href={`/blog/tags/${slug(tag)}${sortedBy != null ? '/sort/' + sortedBy : ''}`}
    >
      {tag} {count ? `(${count})` : null}
    </Link>
  )
}
