const path = require("path");
const tsconfigPaths = require("vite-tsconfig-paths").default;

module.exports = {
  stories: [
    "../app/**/*.stories.@(ts|tsx)",
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-vite",
  },
  async viteFinal(config) {
    config.define.global = "window";
    config.plugins.push(
      tsconfigPaths({
        projects: [path.resolve(path.dirname(__dirname), "tsconfig.json")],
      })
    );
    return config;
  },
};
