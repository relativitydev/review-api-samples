import { Constants } from "./constants";
import getClockCardConfig from "./clock/config";
import getColorControlsCardConfig from "./color-controls/config";
import getNavigationCardConfig from "./navigation/config";
import { LoggerFactory } from "../utilities/logger-factory";

export const getCardDefinitions = (loggerFactory: LoggerFactory) => [
	getClockCardConfig(),
	getColorControlsCardConfig(loggerFactory),
	getNavigationCardConfig(loggerFactory),
];

export const CardConstants = Constants;
