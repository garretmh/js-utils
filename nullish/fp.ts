import type { Predicate } from "../types.d.ts";
import * as Nullish from "./mod.ts";

export type { Nullish } from "./mod.ts";
export {
  all,
  allValues,
  attempt,
  isNonNullable,
  isNullish,
  iterate,
} from "./mod.ts";

export const and =
  <A, B>(b: B | Nullish.Nullish) =>
  (a: A | Nullish.Nullish): B | Nullish.Nullish => Nullish.and(a, b);

export const or =
  <A, B>(b: B | Nullish.Nullish) =>
  (a: A | Nullish.Nullish): A | B | Nullish.Nullish => Nullish.or(a, b);

export const xor =
  <A, B>(b: B | Nullish.Nullish) =>
  (a: A | Nullish.Nullish): A | B | Nullish.Nullish => Nullish.xor(a, b);

export const then =
  <A, B, C = never>(onSome: (a: NonNullable<A>) => B, onNone?: () => C) =>
  (a: A | Nullish.Nullish): B | C | Nullish.Nullish =>
    Nullish.then(a, onSome, onNone);

export const orElse =
  <A, B>(onNone: () => B) => (a: A | Nullish.Nullish): A | B =>
    Nullish.orElse(a, onNone);

export const filter =
  <A>(predicate: Predicate<NonNullable<A>>) =>
  (a: A | Nullish.Nullish): A | Nullish.Nullish => Nullish.filter(a, predicate);
