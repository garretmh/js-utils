import type { TemplateTag } from "./types.d.ts";

/**
 * Base string template tag
 *
 * Roughly equivalent to an untagged string template literal.
 * This is mostly intended to be used in other template tag functions.
 *
 * @see https://github.com/tc39/proposal-string-cooked
 */
export const stringTemplate: TemplateTag = (template, ...substitutions) => {
  const templateLength = template.length;
  const substitutionsLength = substitutions.length;
  if (templateLength <= 0) return "";
  let result = "";
  for (let index = 0; index < templateLength; index++) {
    result += template[index];
    if (index < substitutionsLength) {
      result += substitutions[index];
    }
  }
  return result;
};
