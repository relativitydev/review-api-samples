import { LoggerFactory } from "../../utilities/logger-factory";
import { Constants } from "../constants";
import { navigationCardHtml } from "./navigation-card-html";
import { NavigationCardInstance } from "./navigation-card-instance";

export default (loggerFactory: LoggerFactory) => ({
	id: Constants.Navigation.ID,
	title: "Navigation",
	order: 10,
	icon: {
		class: "icon icon-history",
	},
	singleton: false,
	location: {
		layoutId: "review",
		paneId: "ri-review-right-accordion",
		dockIndex: 1,
	},
	loader: {
		custom: {
			loadCard: (card, target) => {
				target.innerHTML = navigationCardHtml;
				return Promise.resolve();
			},
			unloadCard: (card, target) => {
				return Promise.resolve();
			},
		}
	},
	createInstance: function (card) { return new NavigationCardInstance(loggerFactory, card); },
});
