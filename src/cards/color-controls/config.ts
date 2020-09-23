import { Constants } from "../constants";
import { LoggerFactory } from "../../utilities/logger-factory";
import { ColorControlsCardInstance } from "./color-controls-card-instance";

export default (loggerFactory: LoggerFactory) =>  ({
	id: Constants.ColorControls.ID,
	title: "Colors",
	order: 10,
	icon: {
		class: "icon icon-dashboard",
	},
	singleton: false,
	location: {
		layoutId: "review",
		paneId: "ri-review-right-accordion",
		dockIndex: 0,
	},
	loader: {
		iframe: {
			fileName: "review.color-controls.html",
		},
	},
	createInstance: function (card) { return new ColorControlsCardInstance(loggerFactory, card); },
});
