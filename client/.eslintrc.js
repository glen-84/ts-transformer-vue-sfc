// @ts-check

"use strict";

const path = require("path");

module.exports = /** @type {import("@typescript-eslint/experimental-utils").TSESLint.Linter.Config} */ ({
    extends: ["plugin:vue/recommended", "prettier"],
    parserOptions: {
        extraFileExtensions: [".vue"],
        parser: "@typescript-eslint/parser",
        project: path.join(__dirname, "tsconfig.eslint.json")
    },
    env: {
        es6: true
    },
    rules: {
        //tmp: experimental.
        "@typescript-eslint/no-magic-numbers": ["error", {ignore: [-2, -1, 0, 1, 2]}],

        //tmp: off
        "capitalized-comments": "off",
        "spaced-comment": "off"
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
