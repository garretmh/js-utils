/** A parsed JSON value. */
export type json =
  | string
  | number
  | boolean
  | null
  | json[]
  | { [key: string]: json };

/**
 * Converts a JavaScript Object Notation (JSON) string into an object.
 * @param text A valid JSON string.
 */
export function parse(text: string): json;
/**
 * Converts a JavaScript Object Notation (JSON) string into an object.
 * @param text A valid JSON string.
 * @param reviver A function that transforms the results. This function is called for each member of the object.
 * If a member contains nested objects, the nested objects are transformed before the parent object is.
 */
export function parse(text: string, reviver: Reviver): unknown;
export function parse(text: string, reviver?: Reviver): unknown {
  return JSON.parse(text, reviver);
}

/** A value to stringify to JSON */
export type jsonable =
  | string
  | number
  | boolean
  | null
  | undefined
  | jsonable[]
  | { [key: string]: jsonable }
  | { toJSON(): jsonable };

/**
 * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
 * @param value A JavaScript value, usually an object or array, to be converted.
 * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
 */
export function stringify(
  value: jsonable,
  replacer?: never,
  space?: string | number
): string;
/**
 * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
 * @param value A JavaScript value, usually an object or array, to be converted.
 * @param replacer Either a function that transforms the results, or an array of strings and numbers that acts as an approved list for selecting the object properties that will be stringified.
 * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
 */
export function stringify(
  value: unknown,
  replacer: Replacer,
  space?: string | number
): string;
export function stringify(
  value: unknown,
  replacer?: Replacer,
  space?: string | number
): string {
  return JSON.stringify(value, replacer as any, space);
}

/**
 * Either a function that transforms the results, or an array of strings and
 * numbers that acts as an approved list for selecting the object properties
 * that will be stringified.
 */
type Replacer =
  | ((this: unknown, key: string, value: unknown) => unknown)
  | (number | string)[]
  | null;

/**
 * A function that transforms the results.
 * This function is called for each member of the object.
 */
type Reviver = (this: json, key: string, value: json) => unknown;
