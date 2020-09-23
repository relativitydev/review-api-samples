import { showSelectedTextItem } from "./show-selected-text";

export const viewerContextMenusFn = (api, viewerType) => {
	const contextMenuItems = [];

	if (["native", "text"].indexOf(viewerType) > -1) {
		contextMenuItems.push(showSelectedTextItem);
	}

	return contextMenuItems;
}
