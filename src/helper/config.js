require("dotenv").config();

/**
 * JSON object to identify which environment the code is being run in
 */
module.exports = {
  development: {
    url: process.env.DEV_DATABASE_URL,
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
  },
  production: {
    url: process.env.DATABASE_URL,
  },
};
