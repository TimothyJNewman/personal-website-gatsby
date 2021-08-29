import { getFormattedDate, getFormattedLink, getNewCurrentArticleStart, getNavPageNumbers } from "./CommonUtils"

describe("Testing getFormattedDate", () => {
  test("Example 1", () => {
    expect(getFormattedDate("2021-06-28T11:28:27.944Z")).toBe(new Date("2021-06-28T11:28:27.944Z").toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' }));
  })
  test("Example 2", () => {
    expect(getFormattedDate("2021-07-01T18:22:09.126Z")).toBe(new Date("2021-07-01T18:22:09.126Z").toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' }));
  })
})

describe("Testing getFormattedLink", () => {
  test("Example 1", () => {
    expect(getFormattedLink("domainname.com","/route")).toBe("domainname.com/route");
  })
  test("Example 2", () => {
    expect(getFormattedLink("https://heroku.com","/page")).toBe("https://heroku.com/page");
  })
})

describe("Testing getNewCurrentArticleStart", () => {
  test("Inputs: (-2, 0, 10)", () => {
    expect(getNewCurrentArticleStart(-2, 0, 10)).toBe(0);
  })
  test("Inputs: (-1, 0, 10)", () => {
    expect(getNewCurrentArticleStart(-1, 0, 10)).toBe(4);
  })
  test("Inputs: (1, 0, 10)", () => {
    expect(getNewCurrentArticleStart(1, 0, 10)).toBe(0);
  })
  test("Inputs: (1, -5, 10)", () => {
    expect(getNewCurrentArticleStart(1, -5, 10)).toBe(0);
  })
  test("Inputs: (5, 0, 10)", () => {
    expect(getNewCurrentArticleStart(5, 0, 10)).toBe(16);
  })
})

describe("Testing getNavPageNumbers", () => {
  test("Checking no. of buttons for 1 buttons", () => {
    expect(getNavPageNumbers(1, function() {}).length)
      .toBe(1);
  })
  test("Checking no. of buttons for 5 buttons", () => {
    expect(getNavPageNumbers(5, function() {}).length)
      .toBe(2);
  })
  test("Checking class name", () => {
    expect(getNavPageNumbers(1, function() {})[0].props.className)
      .toBe("posts-navigation-button");
  })
})