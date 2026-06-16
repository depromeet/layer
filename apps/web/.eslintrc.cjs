/* eslint-env node */
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:react/recommended",
    "plugin:import/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ["postcss.config.cjs", "dist", ".eslintrc.cjs", "**/*.cjs"],
  plugins: ["react-refresh", "react", "react-hooks", "import"],
  rules: {
    // react-hooks v7의 "recommended"는 React Compiler 룰셋 전체(error 다수)를 포함한다.
    // 일괄 도입은 별도 cleanup 과제로 두고, 여기서는 기존(v4) 동작만 유지한다.
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    "react/no-unknown-property": ["error", { ignore: ["css"] }],
    "@typescript-eslint/no-misused-promises": "off",
    "react-refresh/only-export-components": ["off", { allowConstantExport: true }],
    "react/react-in-jsx-scope": "off",
    "no-restricted-imports": ["error", { patterns: ["../*", "../**/*"] }],
    "import/newline-after-import": "warn",
    "import/no-default-export": "warn",
    "import/order": [
      "warn",
      {
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: "src/",
      },
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};
