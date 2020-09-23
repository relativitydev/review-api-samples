const { ConcatSource } = require("webpack-sources");

const EXTENSION_NAME = "ReviewExtensionPlugin"

class ReviewExtensionPlugin {
	constructor(options) {
		this._options = this._parseOptions(options);
	}

	apply(compiler) {
		compiler.hooks.compilation.tap(EXTENSION_NAME, (context, entry) => {
			const outputOptions = context.options.output;
			this._validateOutputOptions(outputOptions);
			this._filename = context.options.output.filename;
			this._library = context.options.output.library;
			
		});

		compiler.hooks.emit.tapAsync(EXTENSION_NAME, (compilation, callback) => {
			compilation.updateAsset(this._filename, old => new ConcatSource(...this._getConcatSources(old, this._library)));
			callback();
		});
	}

	_parseOptions(options) {
		options = options || {};

		if (!!options.mode && options.mode === "development") {
			options.mode = "development";
		} else {
			options.mode = "production";
		}

		options.outputFilenames = options.outputFilenames || [];

		return options;
	}

	_validateOutputOptions(output) {
		if (!output.library) {
			throw new Error(`"output.library" option must be specified.`);
		} else if (output.libraryTarget !== "var") {
			throw new Error(`"output.libraryTarget" option must be "var".`);
		}
	}

	_getConcatSources(oldOutput, libraryName) {
		const minify = this._options.mode === "production";

		const sources = ["(function(parameters) {"];
		if (!minify) {
			sources.push("\n\t");
		}
		sources.push(oldOutput);
		if (!minify) {
			sources.push("\n\t");
		}
		sources.push("return ", libraryName, "(parameters);");
		if(!minify) {
			sources.push("\n");
		}
		sources.push("}(params))");
		return sources;
	}
}

module.exports = ReviewExtensionPlugin;
