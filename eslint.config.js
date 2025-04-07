module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  parserOptions: {
    project: "./tsconfig.json",
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "@typescript-eslint", "react", "react-hooks", "jsx-a11y", "import"],
  rules: {
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "quotes": ["warn", "single", { "allowTemplateLiterals": true }],
    "semi": ["warn", "never"],
    "no-extra-semi": "warn",
    "comma-dangle": ["warn", "never"],
    "react/jsx-indent": ["warn", 4],
    "react/jsx-indent-props": ["warn", 4],

    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
}
