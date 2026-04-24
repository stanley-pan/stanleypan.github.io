/** @type {import('next').NextConfig} */
const repoName = "stanleypan.github.io";

const nextConfig = {
  output: "export",
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: `/${repoName}`,
  },
};

module.exports = nextConfig;
