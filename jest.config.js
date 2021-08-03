module.exports = {
  projects: ["<rootDir>/test/config/*"],
  coverageDirectory: "test/coverage",
  coverageReporters: ["lcov", "json"],
  collectCoverage: true,
  setupFilesAfterEnv: ["jest-extended", "./src/setupTests.js"],
  maxWorkers: 1,
  verbose: true,
};
