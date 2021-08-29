import { sanitize, sanitizeKeepUnicode, isEmail } from "./StringValidator"

describe("Testing sanitize", () => {
  test("Example 1", () => {
    expect(sanitize("")).toBe("");
  })
  test("Example 2", () => {
    expect(sanitize("~`!@#$%^&*()_+{}|'><?/")).toBe("");
  })
  test("Example 3", () => {
    expect(sanitize("#hel%lo#")).toBe("hello");
  })
  test("Example 4", () => {
    expect(sanitize("hello there#")).toBe("hello there");
  })
  test("Example 5", () => {
    expect(sanitize("#hello there")).toBe("hello there");
  })
})

describe("Testing sanitizeKeepUnicode", () => {
  test("Example 1", () => {
    expect(sanitizeKeepUnicode(".,?!()")).toBe(".,?!()");
  })
  test("Example 2", () => {
    expect(sanitizeKeepUnicode("~`!@#$%^&*()_+{}|'><?/").match(/[?!()]/g)).toBeTruthy();
  })
  test("Example 3", () => {
    expect(sanitizeKeepUnicode("#hello#")).toBe("hello");
  })
  test("Example 4", () => {
    expect(sanitizeKeepUnicode("What is your name?")).toBe("What is your name?");
  })
  test("Example 5", () => {
    expect(sanitizeKeepUnicode("What is your <name>?")).toBe("What is your name?");
  })
})

describe("Testing isEmail", () => {
  test("Example 1", () => {
    expect(isEmail("test@testemail.com")).toBeTruthy();
  })
  test("Example 2", () => {
    expect(isEmail("testtestemail.com")).toBeFalsy();
  })
  test("Example 3", () => {
    expect(isEmail("test@testemail")).toBeFalsy();
  })
  test("Example 4", () => {
    expect(isEmail("34test@testemail.com")).toBeTruthy();
  })
  test("Example 5", () => {
    expect(isEmail("@testemail.com")).toBeFalsy();
  })
})