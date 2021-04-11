// @ts-check

"use strict";

module.exports = /** @type {import("@typescript-eslint/experimental-utils").TSESLint.Linter.Config} */ ({
    extends: ["prettier"],
    parserOptions: {
        project: "tsconfig.eslint.json"
    },
    env: {
        es6: true
    },
    // Lint .*.js files in the project root directory.
    ignorePatterns: ["!/.*.js"],
    overrides: [
        {
            // JavaScript CommonJS configuration files.
            files: ["./*.js"],
            rules: {
                "@typescript-eslint/no-require-imports": "off",
                "@typescript-eslint/no-var-requires": "off",
                "strict": ["error", "global"]
            },
            parserOptions: {
                sourceType: "script"
            }
        }
    ]
});
