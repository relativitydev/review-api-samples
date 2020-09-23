export const showSelectedTextItem = {
	text: "Show Selected Text",
	onClickCallback: (reviewData, api) => {
		const selectedText = reviewData.getSelectedText();
		window.alert(selectedText);
	},
	onBuildCallback: (contextMenuOptions, reviewData, api) => {
		return contextMenuOptions;
	},
}
