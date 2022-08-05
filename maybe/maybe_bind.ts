import * as Maybe from "./maybe.ts";

export type { Some, None, Maybe } from "./maybe.ts";

export { none } from "./maybe.ts";

// @ts-expect-error Intented to be used as a bound function.
export function isSome<A>(this: Maybe.Maybe<A>): this is Maybe.Some<A> {
  return Maybe.isSome(this);
}
// @ts-expect-error Intented to be used as a bound function.
export function isNone<A>(this: Maybe.Maybe<A>): this is Maybe.None {
  return Maybe.isNone(this);
}
export function and<A, B>(
  this: Maybe.Maybe<A>,
  b: Maybe.Maybe<B>
): Maybe.Maybe<B> {
  return Maybe.and(this, b);
}
export function or<A, B>(
  this: Maybe.Maybe<A>,
  b: Maybe.Maybe<B>
): Maybe.Maybe<A | B> {
  return Maybe.or(this, b);
}
export function xor<A, B>(
  this: Maybe.Maybe<A>,
  b: Maybe.Maybe<B>
): Maybe.Maybe<A | B> {
  return Maybe.xor(this, b);
}
export function then<A, B, C = never>(
  this: Maybe.Maybe<A>,
  onSome: (a: Maybe.Some<A>) => B,
  onNone?: () => C
): Maybe.Maybe<B | C> {
  return Maybe.then(this, onSome, onNone);
}
export function orElse<A, B>(this: Maybe.Maybe<A>, onNone: () => B): A | B {
  return Maybe.orElse(this, onNone);
}
export function filter<A>(
  this: Maybe.Maybe<A>,
  predicate: Maybe.Predicate<Maybe.Some<A>>
): Maybe.Maybe<A> {
  return Maybe.filter(this, predicate);
}
export function* iter<A>(this: Maybe.Maybe<A>): Generator<Maybe.Some<A>, void> {
  yield* Maybe.iter(this);
}
export function all<T extends readonly unknown[] | []>(
  this: Maybe.Maybe<T>
): Maybe.Maybe<Maybe.ArrayOfSome<T>> {
  return Maybe.all(this);
}
export function allValues<T extends Record<PropertyKey, unknown>>(
  this: Maybe.Maybe<T>
): Maybe.Maybe<Maybe.RecordOfSome<T>> {
  return Maybe.allValues(this);
}
