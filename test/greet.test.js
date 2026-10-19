import test from "node:test";
import assert from "node:assert/strict";
import { greet } from "../src/greet.js";

test("greet returns a friendly string", () => {
  assert.equal(greet("world"), "Hello, world!");
});

test("greet rejects empty names", () => {
  assert.throws(() => greet(""), /name is required/);
});
