function prefixResourceFileName(filename, isExtensionScript) {
	if (isExtensionScript) {
		return `review.index.${filename}`;
	} else {
		return `review.${filename}`;
	}
}

module.exports = {
	prefixResourceFileName: prefixResourceFileName,
};
