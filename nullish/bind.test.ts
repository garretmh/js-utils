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
} from "./bind.ts";

Deno.test("none", () => {
  assertEquals(undefined, undefined);
});

Deno.test("isNone", () => {
  assert(!isNullish.call(0));
  assert(!isNullish.call(""));
  assert(!isNullish.call(false));
  assert(!isNullish.call({}));
  assert(!isNullish.call([]));
  assert(!isNullish.call(Symbol()));
  assert(isNullish.call(null));
  assert(isNullish.call(undefined));
});

Deno.test("isSome", () => {
  assert(isNonNullable.call(0));
  assert(isNonNullable.call(""));
  assert(isNonNullable.call(false));
  assert(isNonNullable.call({}));
  assert(isNonNullable.call([]));
  assert(isNonNullable.call(Symbol()));
  assert(!isNonNullable.call(null));
  assert(!isNonNullable.call(undefined));
});

Deno.test("and", () => {
  assertEquals(and.call("aa", "bb"), "bb");
  assertEquals(and.call(undefined, "bb"), undefined);
  assertEquals(and.call(null, "bb"), undefined);
  assertEquals(and.call("aa", undefined), undefined);
  assertEquals(and.call("aa", null), null);
  assertEquals(and.call(undefined, undefined), undefined);
  assertEquals(and.call(undefined, null), undefined);
  assertEquals(and.call(null, undefined), undefined);
  assertEquals(and.call(null, null), undefined);
});

Deno.test("or", () => {
  assertEquals(or.call("aa", "bb"), "aa");
  assertEquals(or.call(undefined, "bb"), "bb");
  assertEquals(or.call("aa", undefined), "aa");
  assertEquals(or.call(undefined, undefined), undefined);
  assertEquals(or.call(undefined, null), null);
  assertEquals(or.call(null, undefined), undefined);
  assertEquals(or.call(null, null), null);
});

Deno.test("xor", () => {
  assertEquals(xor.call("aa", "bb"), undefined);
  assertEquals(xor.call(undefined, "bb"), "bb");
  assertEquals(xor.call("aa", undefined), "aa");
  assertEquals(xor.call(undefined, undefined), undefined);
  assertEquals(xor.call(undefined, null), undefined);
  assertEquals(xor.call(null, undefined), undefined);
  assertEquals(xor.call(null, null), undefined);
});

Deno.test("then", () => {
  const id = (x: unknown) => "+" + x;
  const no = () => "no";

  assertEquals(then.call("aa", id), "+aa");
  assertEquals(then.call("aa", id, no), "+aa");
  assertEquals(then.call(undefined, id), undefined);
  assertEquals(then.call(undefined, id, no), "no");
});

Deno.test("orElse", () => {
  const no = () => "no";

  assertEquals(orElse.call("aa", no), "aa");
  assertEquals(orElse.call(undefined, no), "no");
});

Deno.test("filter", () => {
  const toT = () => true;
  const toF = () => false;

  assertEquals(filter.call("aa", toT), "aa");
  assertEquals(filter.call("aa", toF), undefined);
  assertEquals(filter.call(undefined, toT), undefined);
  assertEquals(filter.call(undefined, toF), undefined);
});

Deno.test("iter", () => {
  assertEquals([...iterate.call("aa")], ["aa"]);
  assertEquals([...iterate.call(undefined)], []);
});

Deno.test("all", () => {
  assertEquals(all.call([]), []);
  assertEquals(all.call(undefined), undefined);
  assertEquals(all.call(["aa"]), ["aa"]);
  assertEquals(all.call([undefined]), undefined);
  assertEquals(all.call(["aa", "bb"]), ["aa", "bb"]);
  assertEquals(all.call([undefined, "bb"]), undefined);
  assertEquals(all.call(["aa", undefined]), undefined);
  assertEquals(all.call([undefined, undefined]), undefined);
});

Deno.test("allValues", () => {
  assertEquals(allValues.call({}), {});
  assertEquals(allValues.call(undefined), undefined);
  assertEquals(allValues.call({ a: "aa" }), { a: "aa" });
  assertEquals(allValues.call({ a: undefined }), undefined);
  assertEquals(allValues.call({ a: "aa", b: "bb" }), { a: "aa", b: "bb" });
  assertEquals(allValues.call({ a: undefined, b: "bb" }), undefined);
  assertEquals(allValues.call({ a: "aa", b: undefined }), undefined);
  assertEquals(allValues.call({ a: undefined, b: undefined }), undefined);
});
