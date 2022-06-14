/* eslint-disable no-undef */
module.exports = {
  serverRuntimeConfig: {
    // Will only be available on the server side
    rollbarServerToken: process.env.ROLLBAR_SERVER_TOKEN,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    rollbarClientToken: process.env.ROLLBAR_CLIENT_TOKEN,
  },
  images: {
    domains: ["cookknow.s3.ap-southeast-1.amazonaws.com"], // pick this url from error
    formats: ["image/avif", "image/webp"],
  }, // optimize images
};
