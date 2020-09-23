import { LoggerFactory } from "../../utilities/logger-factory";
import { Logger } from "loglevel";

export class ColorControlsCardInstance {

	private _logger: Logger;
	private _card;

	constructor(loggerFactory: LoggerFactory, card) {
		this._logger = loggerFactory.create("ControlsControlsCardInstance");
		this._card = card;
	}

	public async cardLoaded(api, card): Promise<void> {
		this._logger.info("loaded");
		(window.top as any).controlsApi.registerReviewApi(api);
	}
}