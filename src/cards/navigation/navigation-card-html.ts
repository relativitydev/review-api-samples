import { Constants } from "../constants";

export const navigationCardHtml = `
<div id="${Constants.Navigation.CARD_ID}" style="text-align: center;">
	<div id="${Constants.Navigation.DOCUMENT_ARTIFACT_ID_ELEMENT_ID}" style="margin-top: 25%; font-size: 30px;"></div>
	<div class="controls">
		<button id="${Constants.Navigation.PREVIOUS_BTN_ID}" style="margin: 10px; height: 25px; width: 80px;">Previous</button>
		<button id="${Constants.Navigation.NEXT_BTN_ID}" style="margin: 10px; height: 25px; width: 80px;">Next</button>
	</div>
</div>
`;
