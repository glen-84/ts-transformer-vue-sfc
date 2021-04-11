// @ts-check

"use strict";

module.exports = /** @type {import("@cspell/cspell-types").FileSettings} */ ({
    version: "0.1",
    language: "en-GB",
    dictionaries: ["typescript"],
    files: ["**/*.{html,js,json,md,scss,ts,vue}"],
    ignorePaths: ["public/assets/"],
    ignoreWords: [
        "gifsicle",
        "iconsets",
        "jpegtran",
        "metainfo",
        "optipng",
        "stylelint",
        "vuetify"
    ]
});
