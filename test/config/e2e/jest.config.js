module.exports = {
  name: "e2e",
  displayName: "E2E Tests",
  roots: ["<rootDir>../../../src/__tests__/e2e"],
  preset: "jest-puppeteer",
  maxWorkers: 1,
};
