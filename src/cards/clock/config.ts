import { Constants } from "../constants";

export default () => ({
	id: Constants.Clock.ID,
	title: "Clock",
	order: 10,
	icon: {
		class: "icon icon-history",
	},
	singleton: true,
	location: {
		layoutId: "review",
		paneId: "ri-review-right-accordion",
		dockIndex: 0,
	},
	loader: {
		iframe: {
			fileName: "review.clock.html",
		},
	},
});
