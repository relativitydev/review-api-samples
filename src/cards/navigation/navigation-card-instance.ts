import { Constants } from "../constants";
import { Logger } from "loglevel";

export class NavigationCardInstance {

	private _logger: Logger;
	private _card;

	private _loaded: boolean;
	private _viewerCollection;

	constructor(loggerFactory, card) {
		this._loaded = false;

		this._logger = loggerFactory.create("NavigationCardInstance")
		this._card = card;
		this._viewerCollection = card.parameters[0];

		this._registerViewerCollectionEventHandlers();
	}

	public async cardLoaded(api, card): Promise<void> {
		this._logger.info("loaded");
		this._loaded = true;

		this._wireUpButtons();

		const artifactId = this._getDocumentArtifactId();
		this._updateDocumentArtifactId(artifactId);
	}

	/**
	 * Updates the background gradient of the card
	 * 
	 * @param {string} startHexCode Hex code for the gradient start color (i.e. "#fce3ec");
	 * @param {string} endHexCode Hex code for the gradient end color (i.e. "#ffe8cc");
	 */
	public updateBackgroundGradient(startHexCode, endHexCode): void {
		try {
			// Ensure hex codes are valid
			const hexColorRegex = new RegExp("#[0-9a-f]{6}");
			if (!hexColorRegex.test(startHexCode)) {
				startHexCode = "#fce3ec";
			}
			if (!hexColorRegex.test(endHexCode)) {
				endHexCode = "#ffe8cc";
			}

			// Set navigation card's background gradient
			const element = document.getElementById(Constants.Navigation.CARD_ID);
			if (element && element.style) {
				element.style.background = `linear-gradient(90deg,${startHexCode},${endHexCode})`;
			} else {
				this._logger.info(`Background gradient not updated because element does not exist.`)
			}
		} catch (e) {
			throw new Error(`Failed to update the navigation card's background gradient. ${e.message}`);
		}
	}

	private _registerViewerCollectionEventHandlers(): void {
		this._viewerCollection.on("contentchanged", this._handleContentChanged);
	}

	//#region Event Handlers

	private _handleContentChanged = (event) => {
		if (event.contentType === "queueitem")
		{
			const artifactId = this._getDocumentArtifactId();
			this._updateDocumentArtifactId(artifactId);
		}
		this._updateDocumentArtifactIdElement("No queue item displayed");
	};

	//#endregion

	private _getDocumentArtifactId(): number {
		const queueItem = this._viewerCollection.queuePointer.item;
		if (queueItem && queueItem.type === "document") {
			return queueItem.artifactId;
		} else {
			return -1;
		}
	}

	private _wireUpButtons(): void {
		document.getElementById(Constants.Navigation.NEXT_BTN_ID).addEventListener("click", () => {
			this._viewerCollection.queuePointer.navigateToNext();
		});
		document.getElementById(Constants.Navigation.PREVIOUS_BTN_ID).addEventListener("click", () => {
			this._viewerCollection.queuePointer.navigateToPrevious();
		});
	}

	private _updateDocumentArtifactId(artifactId: number): void {
		if (!this._loaded) {
			return;
		}

		const artifactIdString = artifactId > 0 ? artifactId.toString() : "";
		this._updateDocumentArtifactIdElement(artifactIdString);
	}

	private _updateDocumentArtifactIdElement(message: string)
	{
		const element = document.getElementById(Constants.Navigation.DOCUMENT_ARTIFACT_ID_ELEMENT_ID);
		element.innerHTML = message;
	}
}
