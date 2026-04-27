/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Strip `node:` prefix so webpack can apply normal fallbacks
      const webpack = require("webpack");
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(/^node:(.*)/, (resource) => {
          resource.request = resource.request.replace(/^node:/, "");
        })
      );

      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        "fs/promises": false,
        path: require.resolve("path-browserify"),
      };
    }
    return config;
  },
};

module.exports = nextConfig;
