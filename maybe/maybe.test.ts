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
} from "./maybe.ts";

Deno.test("none", () => {
  assertEquals(none, undefined);
});

Deno.test("isNone", () => {
  assert(!isNone(0));
  assert(!isNone(""));
  assert(!isNone(false));
  assert(!isNone({}));
  assert(!isNone([]));
  assert(!isNone(Symbol()));
  assert(isNone(none));
  assert(isNone(null));
  assert(isNone(undefined));
});

Deno.test("isSome", () => {
  assert(isSome(0));
  assert(isSome(""));
  assert(isSome(false));
  assert(isSome({}));
  assert(isSome([]));
  assert(isSome(Symbol()));
  assert(!isSome(none));
  assert(!isSome(null));
  assert(!isSome(undefined));
});

Deno.test("and", () => {
  assertEquals(and("aa", "bb"), "bb");
  assertEquals(and(none, "bb"), none);
  assertEquals(and(null, "bb"), none);
  assertEquals(and("aa", none), none);
  assertEquals(and("aa", null), null);
  assertEquals(and(none, none), none);
  assertEquals(and(none, null), none);
  assertEquals(and(null, none), none);
  assertEquals(and(null, null), none);
});

Deno.test("or", () => {
  assertEquals(or("aa", "bb"), "aa");
  assertEquals(or(none, "bb"), "bb");
  assertEquals(or("aa", none), "aa");
  assertEquals(or(none, none), none);
  assertEquals(or(none, null), null);
  assertEquals(or(null, none), none);
  assertEquals(or(null, null), null);
});

Deno.test("xor", () => {
  assertEquals(xor("aa", "bb"), none);
  assertEquals(xor(none, "bb"), "bb");
  assertEquals(xor("aa", none), "aa");
  assertEquals(xor(none, none), none);
  assertEquals(xor(none, null), none);
  assertEquals(xor(null, none), none);
  assertEquals(xor(null, null), none);
});

Deno.test("then", () => {
  const id = (x: unknown) => "+" + x;
  const no = () => "no";

  assertEquals(then("aa", id), "+aa");
  assertEquals(then("aa", id, no), "+aa");
  assertEquals(then(none, id), none);
  assertEquals(then(none, id, no), "no");
});

Deno.test("orElse", () => {
  const no = () => "no";

  assertEquals(orElse("aa", no), "aa");
  assertEquals(orElse(none, no), "no");
});

Deno.test("filter", () => {
  const toT = () => true;
  const toF = () => false;

  assertEquals(filter("aa", toT), "aa");
  assertEquals(filter("aa", toF), none);
  assertEquals(filter(none, toT), none);
  assertEquals(filter(none, toF), none);
});

Deno.test("iter", () => {
  assertEquals([...iter("aa")], ["aa"]);
  assertEquals([...iter(none)], []);
});

Deno.test("all", () => {
  assertEquals(all([]), []);
  assertEquals(all(none), none);
  assertEquals(all(["aa"]), ["aa"]);
  assertEquals(all([none]), none);
  assertEquals(all(["aa", "bb"]), ["aa", "bb"]);
  assertEquals(all([none, "bb"]), none);
  assertEquals(all(["aa", none]), none);
  assertEquals(all([none, none]), none);
});

Deno.test("allValues", () => {
  assertEquals(allValues({}), {});
  assertEquals(allValues(none), none);
  assertEquals(allValues({ a: "aa" }), { a: "aa" });
  assertEquals(allValues({ a: none }), none);
  assertEquals(allValues({ a: "aa", b: "bb" }), { a: "aa", b: "bb" });
  assertEquals(allValues({ a: none, b: "bb" }), none);
  assertEquals(allValues({ a: "aa", b: none }), none);
  assertEquals(allValues({ a: none, b: none }), none);
});
