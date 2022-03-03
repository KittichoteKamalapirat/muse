const { createMetroConfiguration } = require("expo-yarn-workspaces");

module.exports = createMetroConfiguration(__dirname);

// const { getDefaultConfig } = require("metro-config");
// const { resolver: defaultResolver } = getDefaultConfig.getDefaultValues();
// exports.resolver = {
//   ...defaultResolver,
//   sourceExts: [...defaultResolver.sourceExts, "cjs"],
// };
