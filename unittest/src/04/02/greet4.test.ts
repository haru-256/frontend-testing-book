import hoge, { greet, sayGoodBye } from "./greet";

// jest.mock("./greet", () => ({
//   ...jest.requireActual("./greet"),
//   sayGoodBye: (name: string) => `Good bye, ${name}.`,
// }));
jest.mock<typeof import("./greet")>("./greet", () => ({
  ...jest.requireActual("./greet"),
  sayGoodBye: (name: string) => `Good bye, ${name}.`,
  // When using the factory parameter for an ES6 module with a default export, the __esModule: true property needs to be specified
  // ref:https://jestjs.io/ja/docs/jest-object#jestmockmodulename-factory-options
  __esModule: true,
  default: () => "fuga",
}));

test("挨拶を返す（本来の実装どおり）", () => {
  expect(greet("Taro")).toBe("Hello! Taro.");
});

test("さよならを返す（本来の実装ではない）", () => {
  const message = `${sayGoodBye("Taro")} See you.`;
  expect(message).toBe("Good bye, Taro. See you.");
});

test("hoge", () => {
  expect(hoge()).toBe("fuga");
});
