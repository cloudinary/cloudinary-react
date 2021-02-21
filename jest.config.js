let mappedModule;
switch (process.env.TEST_ENV) {
  case "PRODUCTION":
    mappedModule = "<rootDir>/dist/cloudinary-react.js";
    break;
  default:
    mappedModule = "<rootDir>/src/index.js";
}

module.exports = {
  rootDir: ".",
  testRegex: "__tests__/.*.test.js$",
  testEnvironment: 'jsdom',
  runTestsByPath: true,
  setupFilesAfterEnv: ["<rootDir>/__tests__/setupTests.js"],
  moduleNameMapper: {
    "^cloudinary-react$": mappedModule,
    "^../../Util$": "<rootDir>/src/Util"
  },
  bail: true,
  collectCoverageFrom: [
    "<rootDir>/src/**/*.js"
  ],
  moduleFileExtensions: [
    "js",
    "jsx",
  ],
  reporters:
    [
      '<rootDir>/__tests__/reporter.js',
    ],
  modulePaths: [
    "<rootDir>/src"
  ],
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95
    },
  }
};