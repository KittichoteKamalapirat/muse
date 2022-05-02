module.exports = {
  serverRuntimeConfig: {
    // Will only be available on the server side
    rollbarServerToken: process.env.ROLLBAR_SERVER_TOKEN,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    rollbarClientToken: process.env.ROLLBAR_CLIENT_TOKEN,
  },
};
