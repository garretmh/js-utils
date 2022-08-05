import type { Predicate } from "../types.d.ts";
import * as Maybe from "./maybe.ts";

export type { Some, None, Maybe } from "./maybe.ts";
export {
  none,
  isSome,
  isNone,
  attempt,
  iter,
  all,
  allValues,
} from "./maybe.ts";

export const and =
  <A, B>(b: Maybe.Maybe<B>) =>
  (a: Maybe.Maybe<A>): Maybe.Maybe<B> =>
    Maybe.and(a, b);

export const or =
  <A, B>(b: Maybe.Maybe<B>) =>
  (a: Maybe.Maybe<A>): Maybe.Maybe<A | B> =>
    Maybe.or(a, b);

export const xor =
  <A, B>(b: Maybe.Maybe<B>) =>
  (a: Maybe.Maybe<A>): Maybe.Maybe<A | B> =>
    Maybe.xor(a, b);

export const then =
  <A, B, C = never>(onSome: (a: Maybe.Some<A>) => B, onNone?: () => C) =>
  (a: Maybe.Maybe<A>): Maybe.Maybe<B | C> =>
    Maybe.then(a, onSome, onNone);

export const orElse =
  <A, B>(onNone: () => B) =>
  (a: Maybe.Maybe<A>): A | B =>
    Maybe.orElse(a, onNone);

export const filter =
  <A>(predicate: Predicate<Maybe.Some<A>>) =>
  (a: Maybe.Maybe<A>): Maybe.Maybe<A> =>
    Maybe.filter(a, predicate);
