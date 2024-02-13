const path = require("path");
const ProjectPlugin = require("@livepreso/webpack-deck/plugins/project.js");
const webpackConfig = require("@livepreso/webpack-deck/webpack.base.config.js");

/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ["../**/*.mdx", "../**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-styling-webpack",
    {
      name: "@storybook/addon-styling-webpack",
      options: {
        rules: [
          {
            test: /\.s?[ac]ss$/,
            sideEffects: true,
            use: [
              require.resolve("style-loader"),
              {
                loader: "css-loader",
                options: {
                  modules: {
                    exportLocalsConvention: "camelCase",
                    localIdentName: "[path][name]__[local]",
                  },
                  sourceMap: true,
                },
              },
              {
                loader: "sass-loader",
                options: { sourceMap: true },
              },
            ],
          },
        ],
      },
    },
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {
      builder: {
        useSWC: true,
      },
    },
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (config) => {
    const originalConfig = await webpackConfig();
    config.resolve.alias = {
      ...config.resolve.alias,
      ...originalConfig.resolve.alias,
    };

    config.resolve.alias["@ui"] = process.cwd();
    config.plugins.push(new ProjectPlugin());

    const rule = config.module.rules[3];
    rule.exclude[0] = /node_modules\/(?!(.*@livepreso.*)).*/;

    return config;
  },
};
export default config;
