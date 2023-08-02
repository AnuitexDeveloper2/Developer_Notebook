module.exports = {
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  testEnvironment: "jsdom",
  globals: {
    TextEncoder: require("util").TextEncoder,
    "ts-jest": {
      tsconfig: "tsconfig.json",
      diagnostics: {
        ignoreCodes: [151001],
      },
      isolatedModules: true,
    },
  },
  resetMocks: true,
  moduleNameMapper: {
    "@hookform/resolvers/yup":
      "<rootDir>/node_modules/@hookform/resolvers/yup/dist/yup.js",
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/mocks/fileMock.js",
    "\\.(css|less)$": "<rootDir>/src/mocks/fileMock.js",
  },
  setupFilesAfterEnv: ["<rootDir>/test.setup.ts"],
};
