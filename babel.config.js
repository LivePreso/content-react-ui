module.exports = function (api) {
  const isTest = api.env("test");
  let envOpts;
  if (isTest) {
    envOpts = {
      targets: { node: "current" },
    };
  } else {
    envOpts = {
      targets: { browsers: ["last 2 versions"] },
      modules: false,
    };
  }

  const presets = ["@babel/preset-react", ["@babel/preset-env", envOpts]];

  const plugins = [];

  return {
    presets,
    plugins,
  };
};
