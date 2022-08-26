/**
 * Tag function for parsing tagged template literals
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates
 */
export type TemplateTag<T = string> = (
  template: TemplateStringsArray,
  ...substitutions: unknown[]
) => T;
