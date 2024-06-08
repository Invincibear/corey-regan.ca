import type { ShikiTransformer } from "shiki"


/**
 * A transformer that adds raw <code> as a data property.
 * @returns A Shiki transformer.
  */
export function copyButtonRawCodeInjector(): ShikiTransformer {
  return {
    name: "@rehype-pretty/transformers/copy-button",
    code(node) {
      if (node?.type === "element" && node?.tagName === "code") {
        node.properties['data-raw-code'] = this.source
        }
    },
  }
}
