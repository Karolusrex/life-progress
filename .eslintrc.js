module.exports = {
  parser: "babel-eslint",
  root: true,
  plugins: ["prettier"],
  env: {
    browser: true
  },
  settings: {
    react: { version: "16.6.3" }
  },
  extends: ["airbnb-base", "prettier", "plugin:react/recommended"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        singleQuote: true,
        trailingComma: "all",
        printWidth: 120
      }
    ]
  }
};
