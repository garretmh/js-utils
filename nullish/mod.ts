import type { Predicate, Refinement } from "../types.d.ts";

export type Nullish = null | undefined;

export function isNonNullable<T>(maybe: T | Nullish): maybe is NonNullable<T> {
  return maybe != null;
}

export function isNullish<T>(maybe: T | Nullish): maybe is Nullish {
  return maybe == null;
}

export function attempt<A>(fn: () => A): A | undefined;
export function attempt<A, B>(fn: () => A, onCatch: (err: unknown) => B): A | B;
export function attempt<A, B = Nullish>(
  fn: () => A,
  onCatch?: (err: unknown) => B,
): A | B | undefined {
  try {
    return fn();
  } catch (err) {
    return onCatch?.(err);
  }
}

export function and<A, B>(a: A | Nullish, b: B): B | undefined {
  return isNullish(a) ? undefined : b;
}

export function or<A, B>(a: A | Nullish, b: B): A | B | undefined {
  return a ?? b;
}

export function xor<A, B>(a: A | Nullish, b: B | Nullish): A | B | undefined {
  if (isNonNullable(a)) {
    return isNonNullable(b) ? undefined : a;
  } else {
    return isNonNullable(b) ? b : undefined;
  }
}

export function then<A, B, C = never>(
  maybe: A | Nullish,
  onSome: (value: NonNullable<A>) => B,
): B | undefined;
export function then<A, B, C = never>(
  maybe: A | Nullish,
  onSome: (value: NonNullable<A>) => B,
  onNone: () => C,
): B | C;
export function then<A, B, C = never>(
  maybe: A | Nullish,
  onSome: (value: NonNullable<A>) => B,
  onNone?: () => C,
): B | C | undefined;
export function then<A, B, C = never>(
  maybe: A | Nullish,
  onSome: (value: NonNullable<A>) => B,
  onNone?: () => C,
): B | C | undefined {
  return isNonNullable(maybe) ? onSome(maybe) : onNone?.();
}

export function orElse<A, B>(a: A | Nullish, onNone: () => B): A | B {
  return a ?? onNone();
}

export function filter<T, U extends T>(
  maybe: T | Nullish,
  predicate: Refinement<NonNullable<T>, NonNullable<U>>,
): U | undefined;
export function filter<T>(
  maybe: T | Nullish,
  predicate: Predicate<NonNullable<T>>,
): T | undefined;
export function filter<T>(
  maybe: T | Nullish,
  predicate: Predicate<NonNullable<T>>,
): T | undefined {
  return isNonNullable(maybe) && predicate(maybe) ? maybe : undefined;
}

export function* iterate<A>(
  maybe: A | Nullish,
): Generator<NonNullable<A>, void> {
  if (isNonNullable(maybe)) yield maybe;
}

export function all<T extends readonly unknown[] | []>(
  values: T | Nullish,
): NonNullableArray<T> | undefined {
  return isNonNullable(values) && values.every(isNonNullable)
    ? values as NonNullableArray<T>
    : undefined;
}

export type NonNullableArray<T extends readonly unknown[]> = NoNullishArray<
  {
    -readonly [P in keyof T]: SomeOrNone<T[P]>;
  }
>;

export function allValues<T extends Record<PropertyKey, unknown>>(
  record: T | Nullish,
): NonNullableRecord<T> | undefined {
  return isNonNullable(record) && Object.values(record).every(isNonNullable)
    // deno-lint-ignore no-explicit-any
    ? (record as any)
    : undefined;
}

export type NonNullableRecord<T extends Record<PropertyKey, unknown>> =
  NoNullishRecord<
    {
      [P in keyof T]: SomeOrNone<T[P]>;
    }
  >;

// Helper Types.

type SomeOrNone<T> = NonNullable<T> extends never ? undefined : NonNullable<T>;
type NoNullishArray<T extends readonly unknown[] | []> = T[number] extends
  NonNullable<T[number]> ? T : never;
type NoNullishRecord<T extends Record<PropertyKey, unknown>> =
  T[keyof T] extends NonNullable<T[keyof T]> ? T : never;
