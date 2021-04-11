// @ts-check

"use strict";

/* eslint-disable @typescript-eslint/naming-convention -- TODO: ... */
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");
const {transform} = require("@formatjs/ts-transformer");
const {VueLoaderPlugin} = require("vue-loader");
const autoprefixer = require("autoprefixer");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const historyApiFallback = require("connect-history-api-fallback");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const imageminGifsicle = require("imagemin-gifsicle");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminOptipng = require("imagemin-optipng");
const imageminSvgo = require("imagemin-svgo");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const webpack = require("webpack");
/* eslint-enable @typescript-eslint/naming-convention */

const paths = {
    src: path.resolve(__dirname, "src"),
    public: path.resolve(__dirname, "public")
};

// eslint-disable-next-line max-lines-per-function -- Okay for a config file.
module.exports = (env, argv) => {
    const isDev = argv.mode === "development";
    const isHot = Boolean(argv.hot);
    const analyse = Boolean(env?.analyse);

    /* eslint-disable sort-keys -- Not appropriate here. */
    return /** @type {import("webpack").Configuration} */ ({
        mode: isDev ? "development" : "production",
        context: paths.src,
        entry: "./main.ts",
        output: {
            path: paths.public,
            filename: `assets/scripts/${isHot ? "[name]" : "[name]-[contenthash:8]"}.js`,
            chunkFilename: `assets/scripts/${isHot ? "[name]" : "[name]-[contenthash:8]"}.chunk.js`,
            publicPath: isHot ? "http://127.0.0.1:4250/" : "/" //tmp port while BS disabled
        },
        module: {
            // See https://webpack.js.org/configuration/module/#modulenoparse.
            noParse: /^(vue|vue-router)$/u,
            rules: [
                // Vue. (Note: This rule must be listed before the HTML rule.)
                {
                    test: /\.vue$/u,
                    use: [
                        {
                            loader: "vue-loader",
                            options: {
                                compilerOptions: {
                                    whitespace: isDev ? "preserve" : "condense"
                                }
                            }
                        }
                    ]
                },
                // Fonts.
                {
                    //todo: review -- only need woff2?
                    test: /\.(eot|ttf|woff2?)$/u,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: "assets/fonts/[path][name]-[hash:8].[ext]"
                            }
                        }
                    ]
                },
                // HTML.
                {
                    test: /\.html$/u,
                    use: [
                        {
                            loader: "html-loader"
                        }
                    ]
                },
                // Images.
                {
                    test: /\.(gif|ico|jpg|png|svg)$/u,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: "assets/images/[path][name]-[hash:8].[ext]"
                            }
                        }
                    ]
                },
                // Sass.
                {
                    test: /\.s(c|a)ss$/u,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    plugins: [autoprefixer]
                                }
                            }
                        },
                        {
                            loader: "sass-loader"
                        }
                    ]
                },
                // TypeScript.
                {
                    test: /\.ts$/u,
                    use: [
                        {
                            loader: "ts-loader",
                            options: {
                                appendTsSuffixTo: [/\.vue$/u],
                                getCustomTransformers() {
                                    return {
                                        before: [
                                            transform({
                                                overrideIdFn: "[sha512:contenthash:base64:6]"
                                            })
                                        ]
                                    };
                                },
                                transpileOnly: true
                            }
                        }
                    ],
                    include: paths.src
                },
                // TODO: Can be removed once this issue is resolved: https://github.com/vuetifyjs/vuetify/issues/13362.
                {
                    test: /\.m?js/u,
                    resolve: {
                        fullySpecified: false
                    }
                }
            ]
        },
        resolve: {
            alias: {
                "@": paths.src
            },
            extensions: [".mjs", ".ts", ".vue", "..."]
        },
        plugins: [
            analyse && new BundleAnalyzerPlugin(),
            new ForkTsCheckerWebpackPlugin({
                typescript: {
                    configFile: path.resolve(__dirname, "tsconfig.json"),
                    extensions: {
                        vue: {
                            enabled: true,
                            compiler: "@vue/compiler-sfc"
                        }
                    }
                }
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(paths.src, "index.html")
            }),
            !isDev &&
                new ImageMinimizerPlugin({
                    minimizerOptions: {
                        plugins: [
                            imageminGifsicle(),
                            imageminJpegtran(),
                            imageminOptipng(),
                            imageminSvgo()
                        ]
                    }
                }),
            false &&
                isDev &&
                new BrowserSyncPlugin(
                    {
                        host: "127.0.0.1",
                        port: 4200,
                        socket: {domain: "127.0.0.1:4200"},
                        cors: true,
                        server: isHot ? false : "public",
                        middleware: [historyApiFallback()],
                        // Proxy the Webpack Dev Server endpoint through BrowserSync.
                        proxy: isHot ? "http://127.0.0.1:4250/" : undefined,
                        open: false
                    },
                    {
                        // Prevent BrowserSync from reloading the page and let Webpack Dev Server take care of this.
                        reload: !isHot,
                        // TODO: Not working, possibly related to:
                        // * https://github.com/Va1/browser-sync-webpack-plugin/issues/69
                        // * https://github.com/webpack-contrib/mini-css-extract-plugin/issues/85
                        // * https://github.com/webpack/webpack/issues/7300
                        injectCss: !isHot
                    }
                ),
            new MiniCssExtractPlugin({
                filename: `assets/styles/${isHot ? "[name]" : "[name]-[contenthash:8]"}.css`,
                chunkFilename: `assets/styles/${
                    isHot ? "[name]" : "[name]-[contenthash:8]"
                }.chunk.css`
            }),
            new VueLoaderPlugin(),
            new webpack.DefinePlugin({
                /* eslint-disable @typescript-eslint/naming-convention */
                __VUE_OPTIONS_API__: JSON.stringify(true),
                __VUE_PROD_DEVTOOLS__: JSON.stringify(false)
                /* eslint-enable @typescript-eslint/naming-convention */
            })
        ].filter(Boolean),
        optimization: {
            minimizer: [
                "...",
                new CssMinimizerPlugin({
                    // cssProcessorOptions: {
                    //     // See: https://github.com/postcss/postcss/blob/master/docs/source-maps.md
                    //     map: {inline: false}
                    // }
                })
            ],
            runtimeChunk: {
                name: "runtime"
            },
            splitChunks: {
                chunks: "all",
                maxSize: 100000
                // cacheGroups: {
                //     vendorSplit: {
                //         test: /[\\/]node_modules[\\/]/u,
                //         name: (/** @type {{context: string}} */ module) => {
                //             // Extract the name of the package from the path segment after node_modules.
                //             const packageNameRegExp = /\/node_modules\/((?:@[^/]+\/)?[^/\n]+)(?:\/|$)/u;

                //             const packageName = packageNameRegExp.exec(
                //                 module.context.replace(/\\/gu, "/")
                //             )[1];

                //             return `vendor.${packageName.replace("@", "").replace("/", ".")}`;
                //         },
                //         priority: 20
                //     },
                //     // Picks up everything else being used from node_modules that is less than minSize.
                //     defaultVendors: {
                //         test: /[\\/]node_modules[\\/]/u,
                //         name: "defaultVendors",
                //         priority: 10,
                //         enforce: true // Create regardless of the size of the chunk.
                //     }
                // }
            }
        },
        devtool: isDev ? "eval-source-map" : "hidden-source-map",
        devServer: {
            host: "127.0.0.1",
            port: 4250,
            compress: true,
            overlay: true
        },
        experiments: {
            topLevelAwait: true
        }
    });
    /* eslint-enable sort-keys */
};
