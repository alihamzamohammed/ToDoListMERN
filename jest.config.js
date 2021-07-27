module.exports = {
  projects: ["<rootDir>/test/config/*"],
  coverageDirectory: "test/coverage",
  coverageReporters: ["lcov", "json"],
  collectCoverage: true,
  setupFilesAfterEnv: ["jest-extended"],
};
