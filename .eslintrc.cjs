/* eslint-env node */
module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-type-checked",
        "plugin:react-hooks/recommended",
        "plugin:react/recommended",
        "plugin:import/recommended",
        "prettier",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: true,
        tsconfigRootDir: __dirname,
    },
    ignorePatterns: ["postcss.config.cjs", "dist", ".eslintrc.cjs", "**/*.cjs"],
    plugins: ["react-refresh", "react", "import"],
    rules: {
        "@typescript-eslint/no-unused-vars": [
            "warn",
            { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
        ],
        "react/no-unknown-property": ["error", { "ignore": ["css"] }],
        "@typescript-eslint/no-misused-promises": "off",
        "react-refresh/only-export-components": [
            "off",
            { allowConstantExport: true },
        ],
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
                "extensions": [".js", ".jsx", ".ts", ".tsx"]
            }
        },
    },
};