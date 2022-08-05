export type None = null | undefined;
export type Some<T extends {}> = T;
export type Maybe<T> = Some<T> | None;

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
  return isSome(values) && values.every(isSome) ? (values as any) : undefined;
}

export function allValues<T extends Record<PropertyKey, unknown>>(
  record: Maybe<T>
): Maybe<RecordOfSome<T>> {
  return isSome(record) && Object.values(record).every(isSome)
    ? (record as any)
    : undefined;
}

export const fp = {
  none,
  isSome,
  isNone,
  attempt,
  and:
    <A, B>(b: Maybe<B>) =>
    (a: Maybe<A>): Maybe<B> =>
      and(a, b),
  or:
    <A, B>(b: Maybe<B>) =>
    (a: Maybe<A>): Maybe<A | B> =>
      or(a, b),
  xor:
    <A, B>(b: Maybe<B>) =>
    (a: Maybe<A>): Maybe<A | B> =>
      xor(a, b),
  then:
    <A, B, C = never>(onSome: (a: Some<A>) => B, onNone?: () => C) =>
    (a: Maybe<A>): Maybe<B | C> =>
      then(a, onSome, onNone),
  orElse:
    <A, B>(onNone: () => B) =>
    (a: Maybe<A>): A | B =>
      orElse(a, onNone),
  filter:
    <A>(predicate: Predicate<Some<A>>) =>
    (a: Maybe<A>): Maybe<A> =>
      filter(a, predicate),
  iter,
  all,
  allValues,
};

interface bind {
  isSome<A>(this: Maybe<A>): this is Some<A>;
  isNone<A>(this: Maybe<A>): this is None;
  and<A, B>(this: Maybe<A>, b: Maybe<B>): Maybe<B>;
  or<A, B>(this: Maybe<A>, b: Maybe<B>): Maybe<A | B>;
  xor<A, B>(this: Maybe<A>, b: Maybe<B>): Maybe<A | B>;
  then<A, B, C = never>(
    this: Maybe<A>,
    onSome: (a: Some<A>) => B,
    onNone?: () => C
  ): Maybe<B | C>;
  orElse<A, B>(this: Maybe<A>, onNone: () => B): A | B;
  filter<A>(this: Maybe<A>, predicate: Predicate<Some<A>>): Maybe<A>;
  iter<A>(this: Maybe<A>): Generator<Some<A>, void>;
  all<T extends readonly unknown[] | []>(this: Maybe<T>): Maybe<ArrayOfSome<T>>;
  allValues<T extends Record<PropertyKey, unknown>>(
    this: Maybe<T>
  ): Maybe<RecordOfSome<T>>;
}
export const bind: bind = {
  isSome() {
    return isSome(this);
  },
  isNone() {
    return isNone(this);
  },
  and(b) {
    return and(this, b);
  },
  or(b) {
    return or(this, b);
  },
  xor(b) {
    return xor(this, b);
  },
  then(onSome, onNone) {
    return then(this, onSome, onNone);
  },
  orElse(onNone) {
    return orElse(this, onNone);
  },
  filter(predicate) {
    return filter(this, predicate);
  },
  *iter() {
    yield* iter(this);
  },
  all() {
    return all(this);
  },
  allValues() {
    return allValues(this);
  },
};

// Helper Types.

type SomeOrNone<T> = Some<T> extends never ? None : Some<T>;

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

// TODO: extract.
// Generics
export type Predicate<T> = (x: T) => boolean;
export type Refinement<T, U extends T> = (x: T) => x is U;
