import {FigCaption} from "@/components/blog/FigCaption"
import
  React,
  {
    Children,
    HTMLAttributes,
    isValidElement,
    ReactElement,
    ReactNode,
  } from "react"


interface PreProps extends HTMLAttributes<HTMLPreElement> {
  children:  ReactNode
  className: string
}

const findRawCode = (children: ReactNode): string | undefined => {
  let rawCode: string | undefined

  const traverse = (nodes: ReactNode) => {
    Children.forEach(nodes, (child) => {
      if (isValidElement(child)) {
        if (child.props['data-raw-code']) {
          rawCode = child.props['data-raw-code']

          return
        }

        if (child.props.children) {
          traverse(child.props.children)
        }
      }
    })
  }

  traverse(children)

  return rawCode
}

// Type guard to narrow down to ReactElement with specific props
function isFigCaptionElement(child: ReactNode): child is ReactElement<PreProps> {
  return isValidElement(child) && (child.type === FigCaption)
}

export const Figure = ({
  children,
  className,
  ...props
}: PreProps) => {
  const raw_code = findRawCode(children) || ''

  // Manually pass raw_code to FigCaption elements
  const enhancedChildren = Children.map(children, (child) => {
    if (isFigCaptionElement(child)) {
      const {
        children: figCaptionChildren,
        ...restProps
      } = child.props as React.ComponentProps<'figcaption'>

      return (
        <FigCaption {...restProps} textToCopy={raw_code}>
          {figCaptionChildren as ReactNode}
        </FigCaption>
      )
    }

    return child
  })

  return (
    <figure {...props} className={className}>
      {enhancedChildren}
      {/*{children}*/}
    </figure>
  )
}
