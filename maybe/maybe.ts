import type { Predicate, Refinement } from "../types.d.ts";

export type Some<T> = T extends null | undefined ? never : T;
export type None = null | undefined;
export type Maybe<T> = T | None;

export const none: None = undefined;

export function isSome<A>(a: Maybe<A>): a is Some<A> {
  return a != null;
}

export function isNone<A>(a: Maybe<A>): a is None {
  return a == null;
}

export function attempt<A>(fn: () => A): Maybe<A>;
export function attempt<A, B>(fn: () => A, onCatch: (err: unknown) => B): A | B;
export function attempt<A, B = None>(
  fn: () => A,
  onCatch?: (err: unknown) => B
): Maybe<A | B> {
  try {
    return fn();
  } catch (err) {
    return onCatch?.(err);
  }
}

export function and<A, B>(a: Maybe<A>, b: Maybe<B>): Maybe<B> {
  return isNone(a) ? none : b;
}

export function or<A, B>(a: Maybe<A>, b: Maybe<B>): Maybe<A | B> {
  return a ?? b;
}

export function xor<A, B>(a: Maybe<A>, b: Maybe<B>): Maybe<A | B> {
  if (isSome(a)) {
    return isSome(b) ? undefined : a;
  } else {
    return isSome(b) ? b : undefined;
  }
}

export function then<A, B, C = never>(
  a: Maybe<A>,
  onSome: (a: Some<A>) => B,
  onNone?: () => C
): Maybe<B | C> {
  return isSome(a) ? onSome(a) : onNone?.();
}

export function orElse<A, B>(a: Maybe<A>, onNone: () => B): A | B {
  return a ?? onNone();
}

export function filter<A, B extends A>(
  a: Maybe<A>,
  predicate: Refinement<Some<A>, Some<B>>
): Maybe<B>;
export function filter<A>(a: Maybe<A>, predicate: Predicate<Some<A>>): Maybe<A>;
export function filter<A>(
  a: Maybe<A>,
  predicate: Predicate<Some<A>>
): Maybe<A> {
  return isSome(a) && predicate(a) ? a : undefined;
}

export function* iter<A>(a: Maybe<A>): Generator<Some<A>, void> {
  if (isSome(a)) yield a;
}

export function all<T extends readonly unknown[] | []>(
  values: Maybe<T>
): Maybe<ArrayOfSome<T>> {
  // deno-lint-ignore no-explicit-any
  return isSome(values) && values.every(isSome) ? (values as any) : undefined;
}

export function allValues<T extends Record<PropertyKey, unknown>>(
  record: Maybe<T>
): Maybe<RecordOfSome<T>> {
  return isSome(record) && Object.values(record).every(isSome)
    ? // deno-lint-ignore no-explicit-any
      (record as any)
    : undefined;
}

// Helper Types.

type SomeOrNone<T> = NonNullable<T> extends never ? undefined : NonNullable<T>;

type NoNullishArray<T extends readonly unknown[] | []> =
  T[number] extends NonNullable<T[number]> ? T : never;
export type ArrayOfSome<T extends readonly unknown[]> = NoNullishArray<{
  -readonly [P in keyof T]: SomeOrNone<T[P]>;
}>;

type NoNullishRecord<T extends Record<PropertyKey, unknown>> =
  T[keyof T] extends NonNullable<T[keyof T]> ? T : never;
export type RecordOfSome<T extends Record<PropertyKey, unknown>> =
  NoNullishRecord<{
    [P in keyof T]: SomeOrNone<T[P]>;
  }>;
