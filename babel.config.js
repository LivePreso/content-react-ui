module.exports = function (api) {
  const isTest = api.env('test');
  let envOpts;
  if (isTest) {
    envOpts = {
      targets: { node: 'current' },
    };
  } else {
    envOpts = {
      targets: { browsers: ['last 3 versions, not dead'], chrome: 80 },
      corejs: '3.48',
      useBuiltIns: 'usage',
      modules: false,
    };
  }

  const presets = ['@babel/preset-react', ['@babel/preset-env', envOpts]];

  const plugins = [];

  return {
    presets,
    plugins,
    ignore: ['**/external/*.js'],
  };
};
