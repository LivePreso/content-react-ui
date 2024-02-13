module.exports = {
  extends: [
    "airbnb",
    "airbnb/hooks",
    "plugin:storybook/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  globals: {
    Bridge: "readonly",
    moment: "readonly",
    document: "readonly",
    window: "readonly",
  },
  rules: {
    // Make these errors
    "no-console": 2,

    // Disabling rules we don't care about following
    "func-names": 0,
    "react/jsx-filename-extension": 0,
    "import/no-unresolved": 0,
    "import/prefer-default-export": 0,
    "react/jsx-props-no-spreading": 0,
    "import/no-extraneous-dependencies": 0,
    "no-restricted-syntax": 0,
    "no-await-in-loop": 0,
    "import/no-import-module-exports": 0,

    // Change to warnings
    "react/prop-types": 1,
    "jsx-a11y/click-events-have-key-events": 1,
  },
};
