import type { ShikiTransformer } from "shiki"


/**
 * A transformer that adds raw <code> as a data-raw-code property
 *
 * @returns A Shiki transformer
 */
export function copyButtonRawCodeInjector(): ShikiTransformer {
  return {
    name: "copyButtonRawCodeInjector",
    code(node) {
      if (node?.type === "element" && node?.tagName === "code") {
        node.properties['data-raw-code'] = this.source
      }
    },
  }
}



