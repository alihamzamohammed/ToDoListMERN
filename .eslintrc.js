module.exports = {
  parser: "babel-eslint",
  env: {
    jest: true,
    node: true,
    commonjs: true,
  },
  globals: {
    page: true,
    browser: true,
    context: true,
    jestPuppeteer: true,
  },
};
