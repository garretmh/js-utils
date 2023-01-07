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
} from "./fp.ts";

Deno.test("none", () => {
  assertEquals(undefined, undefined);
});

Deno.test("isNone", () => {
  assert(!isNullish(0));
  assert(!isNullish(""));
  assert(!isNullish(false));
  assert(!isNullish({}));
  assert(!isNullish([]));
  assert(!isNullish(Symbol()));
  assert(isNullish(null));
  assert(isNullish(undefined));
});

Deno.test("isSome", () => {
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
  assertEquals(and("bb")("aa"), "bb");
  assertEquals(and("bb")(undefined), undefined);
  assertEquals(and("bb")(null), undefined);
  assertEquals(and(undefined)("aa"), undefined);
  assertEquals(and(null)("aa"), null);
  assertEquals(and(undefined)(undefined), undefined);
  assertEquals(and(null)(undefined), undefined);
  assertEquals(and(undefined)(null), undefined);
  assertEquals(and(null)(null), undefined);
});

Deno.test("or", () => {
  assertEquals(or("bb")("aa"), "aa");
  assertEquals(or("bb")(undefined), "bb");
  assertEquals(or(undefined)("aa"), "aa");
  assertEquals(or(undefined)(undefined), undefined);
  assertEquals(or(null)(undefined), null);
  assertEquals(or(undefined)(null), undefined);
  assertEquals(or(null)(null), null);
});

Deno.test("xor", () => {
  assertEquals(xor("bb")("aa"), undefined);
  assertEquals(xor("bb")(undefined), "bb");
  assertEquals(xor(undefined)("aa"), "aa");
  assertEquals(xor(undefined)(undefined), undefined);
  assertEquals(xor(null)(undefined), undefined);
  assertEquals(xor(undefined)(null), undefined);
  assertEquals(xor(null)(null), undefined);
});

Deno.test("then", () => {
  const id = (x: unknown) => "+" + x;
  const no = () => "no";

  assertEquals(then(id)("aa"), "+aa");
  assertEquals(then(id, no)("aa"), "+aa");
  assertEquals(then(id)(undefined), undefined);
  assertEquals(then(id, no)(undefined), "no");
});

Deno.test("orElse", () => {
  const no = () => "no";

  assertEquals(orElse(no)("aa"), "aa");
  assertEquals(orElse(no)(undefined), "no");
});

Deno.test("filter", () => {
  const toT = () => true;
  const toF = () => false;

  assertEquals(filter(toT)("aa"), "aa");
  assertEquals(filter(toF)("aa"), undefined);
  assertEquals(filter(toT)(undefined), undefined);
  assertEquals(filter(toF)(undefined), undefined);
});

Deno.test("iter", () => {
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
