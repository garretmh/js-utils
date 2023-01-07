import type { Predicate } from "../types.d.ts";
import * as Nullish from "./mod.ts";

export type { Nullish } from "./mod.ts";

export function isNonNullable<A>(
  this: A | Nullish.Nullish,
  // @ts-expect-error Intented to be used as a bound function.
): this is NonNullable<A> {
  return Nullish.isNonNullable(this);
}
export function isNullish<A>(
  this: A | Nullish.Nullish,
  // @ts-expect-error Intented to be used as a bound function.
): this is Nullish.Nullish {
  return Nullish.isNullish(this);
}
export function and<A, B>(
  this: A | Nullish.Nullish,
  b: B | Nullish.Nullish,
): B | Nullish.Nullish {
  return Nullish.and(this, b);
}
export function or<A, B>(
  this: A | Nullish.Nullish,
  b: B | Nullish.Nullish,
): A | B | Nullish.Nullish {
  return Nullish.or(this, b);
}
export function xor<A, B>(
  this: A | Nullish.Nullish,
  b: B | Nullish.Nullish,
): A | B | Nullish.Nullish {
  return Nullish.xor(this, b);
}
export function then<A, B, C = never>(
  this: A | Nullish.Nullish,
  onSome: (a: NonNullable<A>) => B,
  onNone?: () => C,
): B | C | Nullish.Nullish {
  return Nullish.then(this, onSome, onNone);
}
export function orElse<A, B>(
  this: A | Nullish.Nullish,
  onNone: () => B,
): A | B {
  return Nullish.orElse(this, onNone);
}
export function filter<A>(
  this: A | Nullish.Nullish,
  predicate: Predicate<NonNullable<A>>,
): A | Nullish.Nullish {
  return Nullish.filter(this, predicate);
}
export function* iterate<A>(
  this: A | Nullish.Nullish,
): Generator<NonNullable<A>, void> {
  yield* Nullish.iterate(this);
}
export function all<T extends readonly unknown[] | []>(
  this: T | Nullish.Nullish,
): Nullish.NonNullableArray<T> | Nullish.Nullish {
  return Nullish.all(this);
}
export function allValues<T extends Record<PropertyKey, unknown>>(
  this: T | Nullish.Nullish,
): Nullish.NonNullableRecord<T> | Nullish.Nullish {
  return Nullish.allValues(this);
}
