import { assert, assertEquals } from "$std/testing/asserts.ts";
import {
  all,
  allValues,
  and,
  filter,
  isNone,
  isSome,
  iter,
  none,
  or,
  orElse,
  then,
  xor,
} from "./maybe_bind.ts";

Deno.test("none", () => {
  assertEquals(none, undefined);
});

Deno.test("isNone", () => {
  assert(!isNone.call(0));
  assert(!isNone.call(""));
  assert(!isNone.call(false));
  assert(!isNone.call({}));
  assert(!isNone.call([]));
  assert(!isNone.call(Symbol()));
  assert(isNone.call(none));
  assert(isNone.call(null));
  assert(isNone.call(undefined));
});

Deno.test("isSome", () => {
  assert(isSome.call(0));
  assert(isSome.call(""));
  assert(isSome.call(false));
  assert(isSome.call({}));
  assert(isSome.call([]));
  assert(isSome.call(Symbol()));
  assert(!isSome.call(none));
  assert(!isSome.call(null));
  assert(!isSome.call(undefined));
});

Deno.test("and", () => {
  assertEquals(and.call("aa", "bb"), "bb");
  assertEquals(and.call(none, "bb"), none);
  assertEquals(and.call(null, "bb"), none);
  assertEquals(and.call("aa", none), none);
  assertEquals(and.call("aa", null), null);
  assertEquals(and.call(none, none), none);
  assertEquals(and.call(none, null), none);
  assertEquals(and.call(null, none), none);
  assertEquals(and.call(null, null), none);
});

Deno.test("or", () => {
  assertEquals(or.call("aa", "bb"), "aa");
  assertEquals(or.call(none, "bb"), "bb");
  assertEquals(or.call("aa", none), "aa");
  assertEquals(or.call(none, none), none);
  assertEquals(or.call(none, null), null);
  assertEquals(or.call(null, none), none);
  assertEquals(or.call(null, null), null);
});

Deno.test("xor", () => {
  assertEquals(xor.call("aa", "bb"), none);
  assertEquals(xor.call(none, "bb"), "bb");
  assertEquals(xor.call("aa", none), "aa");
  assertEquals(xor.call(none, none), none);
  assertEquals(xor.call(none, null), none);
  assertEquals(xor.call(null, none), none);
  assertEquals(xor.call(null, null), none);
});

Deno.test("then", () => {
  const id = (x: unknown) => "+" + x;
  const no = () => "no";

  assertEquals(then.call("aa", id), "+aa");
  assertEquals(then.call("aa", id, no), "+aa");
  assertEquals(then.call(none, id), none);
  assertEquals(then.call(none, id, no), "no");
});

Deno.test("orElse", () => {
  const no = () => "no";

  assertEquals(orElse.call("aa", no), "aa");
  assertEquals(orElse.call(none, no), "no");
});

Deno.test("filter", () => {
  const toT = () => true;
  const toF = () => false;

  assertEquals(filter.call("aa", toT), "aa");
  assertEquals(filter.call("aa", toF), none);
  assertEquals(filter.call(none, toT), none);
  assertEquals(filter.call(none, toF), none);
});

Deno.test("iter", () => {
  assertEquals([...iter.call("aa")], ["aa"]);
  assertEquals([...iter.call(none)], []);
});

Deno.test("all", () => {
  assertEquals(all.call([]), []);
  assertEquals(all.call(none), none);
  assertEquals(all.call(["aa"]), ["aa"]);
  assertEquals(all.call([none]), none);
  assertEquals(all.call(["aa", "bb"]), ["aa", "bb"]);
  assertEquals(all.call([none, "bb"]), none);
  assertEquals(all.call(["aa", none]), none);
  assertEquals(all.call([none, none]), none);
});

Deno.test("allValues", () => {
  assertEquals(allValues.call({}), {});
  assertEquals(allValues.call(none), none);
  assertEquals(allValues.call({ a: "aa" }), { a: "aa" });
  assertEquals(allValues.call({ a: none }), none);
  assertEquals(allValues.call({ a: "aa", b: "bb" }), { a: "aa", b: "bb" });
  assertEquals(allValues.call({ a: none, b: "bb" }), none);
  assertEquals(allValues.call({ a: "aa", b: none }), none);
  assertEquals(allValues.call({ a: none, b: none }), none);
});
