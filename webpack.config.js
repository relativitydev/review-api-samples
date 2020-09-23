const path = require("path");
const ReviewExtensionPlugin = require("./build-utilities/review-extension-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const prefixResourceFileName = require("./build-utilities/review-extension-utilities").prefixResourceFileName;

// This webpack config is meant as an example of how to use the ReviewExtensionPlugin and may not be production-ready.
module.exports = (env, argv) => {
	const extensionScript = {
		entry: "./src/index.ts",
		output: {
			filename: "review.index.sample.extension.js",
			path: path.resolve(__dirname, "dist"),
			library: "ext",
			libraryTarget: "var",
			libraryExport: "default",
		},
		module: {
			rules: [
				{ test: /\.ts$/, use: "ts-loader", exclude: /node_modules/ },
			],
		},
		resolve: {
			extensions: [ ".ts", ".js" ],
		},
		plugins: [
			new ReviewExtensionPlugin({
				mode: argv.mode,
			}),
			new CopyPlugin([
				{ from: "./src/cards/clock/clock.html", to: prefixResourceFileName("clock.html") },
				{ from: "./src/cards/clock/clock.js", to: prefixResourceFileName("clock.js") },
				{ from: "./src/cards/clock/clock.css", to: prefixResourceFileName("clock.css") },
				{ from: "./src/cards/color-controls/color-controls.html", to: prefixResourceFileName("color-controls.html") },
				{ from: "./src/cards/color-controls/color-controls.js", to: prefixResourceFileName("color-controls.js") },
			]),
		]
	};

	return [extensionScript];
};
