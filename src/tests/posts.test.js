const { createPosts, createPost, createSingle } = require("../posts");

const { isNullOrWhitespace, setConfig } = require("../config");

const configModule = require("../config");
const config = configModule.config;

describe("posts tests", () => {
  test("check if arguments are passed to tool", () => {
    expect(process.argv.length).toBeGreaterThan(1);
  });

  test("check if style is set to default", () => {
    expect(config.dev.stylesheet).toBe(
      "https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
    );
  });

  test("check if lang is set to default", () => {
    expect(config.dev.lang).toBe("en");
  });

  test("if invalid json is passed, expect false", () => {
    expect(setConfig("invalid_file")).toBeFalsy();
  });

  test("if data is passed, expect false", () => {
    expect(isNullOrWhitespace("test data")).toBeFalsy();
  });

  test("if null is passed, expect true", () => {
    expect(isNullOrWhitespace(null)).toBeTruthy();
  });

  test("if whitespace is passed, expect true", () => {
    expect(isNullOrWhitespace(" ")).toBeTruthy();
  });
});

describe("snapshot testing", () => {
  test("check test txt file", () => {
    expect(createPost("test")).toMatchSnapshot();
  });

  test("check txt processing", () => {
    expect(createPost("naval-treaty")).toMatchSnapshot();
  });
});

describe("check if nothing passed to create post functions", () => {
  test("check if nothing passed to function", () => {
    expect(createPost()).toBeFalsy();
  });

  test("check if text file is passed to function", () => {
    expect(createPost("naval-treaty")).toBeTruthy();
  });

  test("check if nothing passed to function", () => {
    expect(createSingle()).toBeFalsy();
  });
});
