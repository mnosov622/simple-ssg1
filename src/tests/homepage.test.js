const { addHomePage } = require("../homepage");

test("if nothing passed to function return false", () => {
  expect(addHomePage()).toBeFalsy();
});
