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
} from "./maybe_fp.ts";

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
  assertEquals(and("bb")("aa"), "bb");
  assertEquals(and("bb")(none), none);
  assertEquals(and("bb")(null), none);
  assertEquals(and(none)("aa"), none);
  assertEquals(and(null)("aa"), null);
  assertEquals(and(none)(none), none);
  assertEquals(and(null)(none), none);
  assertEquals(and(none)(null), none);
  assertEquals(and(null)(null), none);
});

Deno.test("or", () => {
  assertEquals(or("bb")("aa"), "aa");
  assertEquals(or("bb")(none), "bb");
  assertEquals(or(none)("aa"), "aa");
  assertEquals(or(none)(none), none);
  assertEquals(or(null)(none), null);
  assertEquals(or(none)(null), none);
  assertEquals(or(null)(null), null);
});

Deno.test("xor", () => {
  assertEquals(xor("bb")("aa"), none);
  assertEquals(xor("bb")(none), "bb");
  assertEquals(xor(none)("aa"), "aa");
  assertEquals(xor(none)(none), none);
  assertEquals(xor(null)(none), none);
  assertEquals(xor(none)(null), none);
  assertEquals(xor(null)(null), none);
});

Deno.test("then", () => {
  const id = (x: unknown) => "+" + x;
  const no = () => "no";

  assertEquals(then(id)("aa"), "+aa");
  assertEquals(then(id, no)("aa"), "+aa");
  assertEquals(then(id)(none), none);
  assertEquals(then(id, no)(none), "no");
});

Deno.test("orElse", () => {
  const no = () => "no";

  assertEquals(orElse(no)("aa"), "aa");
  assertEquals(orElse(no)(none), "no");
});

Deno.test("filter", () => {
  const toT = () => true;
  const toF = () => false;

  assertEquals(filter(toT)("aa"), "aa");
  assertEquals(filter(toF)("aa"), none);
  assertEquals(filter(toT)(none), none);
  assertEquals(filter(toF)(none), none);
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
