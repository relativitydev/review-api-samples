(function (window) {
	var reviewApi;

	function registerReviewApi(api) {
		reviewApi = api;
	}

	function generateRandomHexColor() {
		// https://css-tricks.com/snippets/javascript/random-hex-color/
		return "#" + Math.floor(Math.random()*16777215).toString(16);
	}

	function updateColor() {
		var startHex = generateRandomHexColor();
		var endHex = generateRandomHexColor();

		if (reviewApi) {
			var navigationCard = reviewApi.cards.getCard("example.cards.navigation-card-0");
			navigationCard.instance.updateBackgroundGradient(startHex, endHex);
		}
	}

	window.controlsApi = {
		registerReviewApi: registerReviewApi,
		updateColor: updateColor,
	};
}(window.top))