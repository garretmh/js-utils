import { assertEquals, assertThrows } from "$std/testing/asserts.ts";
import { stringTemplate } from "./string_template.ts";

Deno.test("stringTemplate", () => {
  assertEquals(stringTemplate``, ``);
  assertEquals(stringTemplate`foo`, `foo`);
  assertEquals(stringTemplate`${"foo"}`, `${"foo"}`);
  assertEquals(stringTemplate`foo${"bar"}`, `foo${"bar"}`);
  assertEquals(stringTemplate`foo${"bar"}baz`, `foo${"bar"}baz`);
  assertEquals(
    stringTemplate`
      ${undefined} ${null}
      ${true} ${false}
      ${-Infinity} ${-1} ${-0} ${0} ${1} ${1.1} ${Infinity} ${NaN}
      ${""} ${" "} ${"a1! 😀"}
      ${[]} ${[0]}
      ${{}} ${{ foo: "bar" }}
      ${new Date(0)}
      ${BigInt(Number.MAX_SAFE_INTEGER) + 1n}
    `,
    `
      ${undefined} ${null}
      ${true} ${false}
      ${-Infinity} ${-1} ${-0} ${0} ${1} ${1.1} ${Infinity} ${NaN}
      ${""} ${" "} ${"a1! 😀"}
      ${[]} ${[0]}
      ${{}} ${{ foo: "bar" }}
      ${new Date(0)}
      ${BigInt(Number.MAX_SAFE_INTEGER) + 1n}
    `
  );
  assertThrows(() => stringTemplate`${Symbol()}`);
});
