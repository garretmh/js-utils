export type Predicate<T> = (x: T) => boolean;
export type Refinement<T, U extends T> = (x: T) => x is U;
