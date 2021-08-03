module.exports = {
  server: {
    command:
      "npx cross-env NODE_ENV=test concurrently 'node server.js' 'react-scripts start'",
    port: 3000,
    launchTimeout: 30000,
    debug: true,
  },
};
