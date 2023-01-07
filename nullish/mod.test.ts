import { assert, assertEquals } from "$std/testing/asserts.ts";
import {
  all,
  allValues,
  and,
  filter,
  isNonNullable,
  isNullish,
  iterate,
  or,
  orElse,
  then,
  xor,
} from "./mod.ts";

Deno.test("isNullish", () => {
  assert(!isNullish(0));
  assert(!isNullish(""));
  assert(!isNullish(false));
  assert(!isNullish({}));
  assert(!isNullish([]));
  assert(!isNullish(Symbol()));
  assert(isNullish(null));
  assert(isNullish(undefined));
});

Deno.test("isNonNullable", () => {
  assert(isNonNullable(0));
  assert(isNonNullable(""));
  assert(isNonNullable(false));
  assert(isNonNullable({}));
  assert(isNonNullable([]));
  assert(isNonNullable(Symbol()));
  assert(!isNonNullable(null));
  assert(!isNonNullable(undefined));
});

Deno.test("and", () => {
  assertEquals(and("aa", "bb"), "bb");
  assertEquals(and(undefined, "bb"), undefined);
  assertEquals(and(null, "bb"), undefined);
  assertEquals(and("aa", undefined), undefined);
  assertEquals(and("aa", null), null);
  assertEquals(and(undefined, undefined), undefined);
  assertEquals(and(undefined, null), undefined);
  assertEquals(and(null, undefined), undefined);
  assertEquals(and(null, null), undefined);
});

Deno.test("or", () => {
  assertEquals(or("aa", "bb"), "aa");
  assertEquals(or(undefined, "bb"), "bb");
  assertEquals(or("aa", undefined), "aa");
  assertEquals(or(undefined, undefined), undefined);
  assertEquals(or(undefined, null), null);
  assertEquals(or(null, undefined), undefined);
  assertEquals(or(null, null), null);
});

Deno.test("xor", () => {
  assertEquals(xor("aa", "bb"), undefined);
  assertEquals(xor(undefined, "bb"), "bb");
  assertEquals(xor("aa", undefined), "aa");
  assertEquals(xor(undefined, undefined), undefined);
  assertEquals(xor(undefined, null), undefined);
  assertEquals(xor(null, undefined), undefined);
  assertEquals(xor(null, null), undefined);
});

Deno.test("then", () => {
  const id = (x: unknown) => "+" + x;
  const no = () => "no";

  assertEquals(then("aa", id), "+aa");
  assertEquals(then("aa", id, no), "+aa");
  assertEquals(then(undefined, id), undefined);
  assertEquals(then(undefined, id, no), "no");
});

Deno.test("orElse", () => {
  const no = () => "no";

  assertEquals(orElse("aa", no), "aa");
  assertEquals(orElse(undefined, no), "no");
});

Deno.test("filter", () => {
  const toT = () => true;
  const toF = () => false;

  assertEquals(filter("aa", toT), "aa");
  assertEquals(filter("aa", toF), undefined);
  assertEquals(filter(undefined, toT), undefined);
  assertEquals(filter(undefined, toF), undefined);
});

Deno.test("iterate", () => {
  assertEquals([...iterate("aa")], ["aa"]);
  assertEquals([...iterate(undefined)], []);
});

Deno.test("all", () => {
  assertEquals(all([]), []);
  assertEquals(all(undefined), undefined);
  assertEquals(all(["aa"]), ["aa"]);
  assertEquals(all([undefined]), undefined);
  assertEquals(all(["aa", "bb"]), ["aa", "bb"]);
  assertEquals(all([undefined, "bb"]), undefined);
  assertEquals(all(["aa", undefined]), undefined);
  assertEquals(all([undefined, undefined]), undefined);
});

Deno.test("allValues", () => {
  assertEquals(allValues({}), {});
  assertEquals(allValues(undefined), undefined);
  assertEquals(allValues({ a: "aa" }), { a: "aa" });
  assertEquals(allValues({ a: undefined }), undefined);
  assertEquals(allValues({ a: "aa", b: "bb" }), { a: "aa", b: "bb" });
  assertEquals(allValues({ a: undefined, b: "bb" }), undefined);
  assertEquals(allValues({ a: "aa", b: undefined }), undefined);
  assertEquals(allValues({ a: undefined, b: undefined }), undefined);
});
