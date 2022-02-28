var __awaiter = (this ) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value ; }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); }  }
        
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchResults, search } from "./met-api.js";
import { setCurrentCartCount } from "./cart-count.js";
const RESULT_LIMIT = 100;
performSearch("q");
setCurrentCartCount();
function performSearch(queryParam) {
    return __awaiter(this, void 0, void 0, function* () {
        const searchQuery = (new URL(document.location.toString())).searchParams.get(queryParam);
        const searchInfo = document.getElementById("search-info");
        const gallery = document.getElementById("gallery");
        let resultNumber = 0;
        if (searchQuery === null ) {
            let highlightsResponse = yield fetch('highlights.json');
            let highlightsJson = [];
            yield highlightsResponse.json()
                .then(res => highlightsJson = res.highlights);
            const highlightsSearchResponse = {
                objectIDs: highlightsJson,
                total: highlightsJson.length
            };
            let connectedResults = yield fetchResults(highlightsSearchResponse, highlightsJson.length);
            displayResults(connectedResults, gallery);
        }
    });
}
/**
 * displays an array of MET-API Art objects (returned by the object endpoint)
 * @param connectedSearchResults array of MET API Art objects
 * @param gallery HTMLElement in which the elements should be displayed
 */
function displayResults(connectedSearchResults, gallery) {
    connectedSearchResults.forEach(obj => {
        //generate HTML Elements
        const resultDiv = document.createElement('div');
        resultDiv.className = "thumb";
        const resultLink = document.createElement('a');
        resultLink.href = `config.html?objectID=${obj.objectID}`;
        resultLink.id = `object-${obj.objectID}`;
        const imageElement = document.createElement('img');
        imageElement.src = obj.primaryImageSmall;
        imageElement.alt = "";
        imageElement.id = `object-image-${obj.objectID}`;
        const objectLabel = document.createElement('div');
        objectLabel.className = "museum-label";
        const artistSpan = document.createElement('span');
        artistSpan.className = "artist";
        artistSpan.textContent = obj.artistDisplayName;
        const titleSpan = document.createElement('span');
        titleSpan.className = "title";
        titleSpan.textContent = obj.title;
        const dateSpan = document.createElement('span');
        dateSpan.className = "date";
        dateSpan.textContent = obj.objectDate;
        //assemble element
        objectLabel.appendChild(artistSpan);
        objectLabel.appendChild(titleSpan);
        objectLabel.append(", ");
        objectLabel.appendChild(dateSpan);
        resultLink.appendChild(imageElement);
        resultLink.appendChild(objectLabel);
        resultDiv.appendChild(resultLink);
        gallery.appendChild(resultDiv);
    });
}
