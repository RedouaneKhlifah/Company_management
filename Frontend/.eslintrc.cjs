module.exports = {
    env: { browser: true, es2020: true },
    extends: [
        "semistandard",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended"
    ],
    parserOptions: { ecmaVersion: "latest", sourceType: "module" },
    settings: { react: { version: "18.2" } },
    plugins: ["react-refresh", "only-warn"],
    rules: {
        "react-refresh/only-export-components": "warn",
        "import/no-absolute-path": "off",
        "react/jsx-no-target-blank": "off",
        "space-before-function-paren": "off",
        semi: ["warn", "always"],
        indent: ["warn", 4],
        "no-unused-vars": ["warn"],
        "prefer-const": ["warn"],
        quotes: ["warn", "double"],
        "comma-dangle": ["off"]
    }
};
