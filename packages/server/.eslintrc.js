module.exports = {
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/jsx-filename-extension": 0, // it's all js these days,
    "jsx-a11y/label-has-associated-control": 0,
    "jsx-a11y/control-has-associated-label": 0,
    "import/no-extraneous-dependencies": 0,
    "import/prefer-default-export": 0,

    // We use Webpacker's "additional_paths" config setting so that we can
    // specify paths relative to the 'app/javascript' folder, however eslint
    // will complain about this because it can't resolve these paths
    "import/no-unresolved": 0,
    "import/extensions": ["error", "ignorePackages", { "": "never" }],
    "jsx-newline": 0,
    "no-shadow": "warn",
    "@typescript-eslint/no-explicit-any": "off",
  },
};
