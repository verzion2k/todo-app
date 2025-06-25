export {};
module.exports = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  transform: {
    ".(ts|tsx)": "ts-jest",
  },

  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/coverage",
    "package.json",
    "package-lock.json",
    "reportWebVitals.ts",
    "setupTests.ts",
    "index.tsx",
  ],
  setupFilesAfterEnv: ["./jest.setup.ts"],
};
