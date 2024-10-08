import { Callout }         from "@/components/Callout"
import { Figure }          from "@/components/blog/Figure"
import { FigCaption }      from "@/components/blog/FigCaption"
import { cn }              from "@/lib/utils"
import {Flow_Rounded} from "next/dist/compiled/@next/font/dist/google"
import Image               from "next/image"
import Link                from "next/link"
import * as runtime        from "react/jsx-runtime"
import {
  HTMLAttributes,
  ImgHTMLAttributes,
}  from "react"


const useMDXComponent = (code: string) => {
  const fn = new Function(code)

  return fn({ ...runtime }).default
}

const components = {
  h1: ({ className, ...props }: { className?: HTMLAttributes<HTMLHeadingElement> }) => (
    <h1
      className={cn(
        "mt-2 scroll-m-20 text-4xl font-bold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: { className?: HTMLAttributes<HTMLHeadingElement> }) => (
    <h2
      className={cn(
        "mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: { className?: HTMLAttributes<HTMLHeadingElement> }) => (
    <h3
      className={cn(
        "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: { className?: HTMLAttributes<HTMLHeadingElement> }) => (
    <h4
      className={cn(
        "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: { className?: HTMLAttributes<HTMLHeadingElement> }) => (
    <h5
      className={cn(
        "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: { className?: HTMLAttributes<HTMLHeadingElement> }) => (
    <h6
      className={cn(
        "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }: { className?: HTMLAttributes<HTMLLinkElement> }) => (
    <a
      className={cn("font-medium underline underline-offset-4", className)}
      {...props}
    />
  ),
  p: ({ className, ...props }: { className?: HTMLAttributes<HTMLParagraphElement> }) => (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: { className?: HTMLAttributes<HTMLUListElement> }) => (
    <ul className={cn("my-1 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }: { className?: HTMLAttributes<HTMLOListElement> }) => (
    <ol className={cn("my-1 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }: { className?: HTMLAttributes<HTMLLIElement> }) => (
    <li className={cn("my-0", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: { className?: HTMLAttributes<HTMLQuoteElement> }) => (
    <blockquote
      className={cn(
        "mt-6 border-l-2 pl-6 italic [&>*]:text-muted-foreground",
        className
      )}
      {...props}
    />
  ),
  img: ({ className, alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn("rounded-md border", className)} alt={alt} {...props} />
  ),
  hr: ({ ...props }) => (
    <hr className="my-4 md:my-8" {...props} />
  ),
  table: ({ className, ...props }: HTMLAttributes<HTMLTableElement>) => (
    /*<div className="my-6 w-full overflow-y-auto">
      <table className={cn("w-full", className)} {...props} />*/
    <div className="my-6 overflow-y-auto">
      <table className={className} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn("m-0 border-t p-0 even:bg-muted", className)}
      {...props}
    />
  ),
  th: ({ className, ...props }: { className?: HTMLAttributes<HTMLTableCellElement> }) => (
    <th
      className={cn(
        "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: { className?: HTMLAttributes<HTMLTableCellElement> }) => (
    <td
      className={cn(
        "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: { className?: HTMLAttributes<HTMLTableCellElement> }) => (
    <pre
      className={cn(
        "pt-0 overflow-x-auto rounded-t-none rounded-b-xl",
        className
      )}
      {...props}
    />
  ),
  figure: Figure,
  figcaption: FigCaption,
  code: ({className, ...props}: { className?: string }) => {
    const rounded = ('data-language' in props) ? 'rounded-b-xl' : 'rounded-lg'

    return (
    <code
      className={cn(
        `relative px-[0.3rem] py-[0.2rem] font-mono text-sm`,
        "not:prose",
        rounded,
        className
      )}
      {...props}
    />
  )},
  Image,
  Link,
  Callout,
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
