import { ThumbDocumentContainer } from "./search-dom.js"
import * as SearchAPI from "./search-api.js"
import * as MuseumAPI from "../museum/museum-api.js"
import { loadCartLink } from "../cart-service.js";

String.prototype.trim = function(charlist) {
    return this.trimLeft(charlist).trimRight(charlist);
};

const searchInfoElement = document.getElementById("search-info");

function checkQueryParams() {
    let params = (new URL(document.location)).searchParams;
    let q = params.get("q");
    console.log("Query params: " + q);
    if (validateSearchString(q)) {
        changeSearchInfo("Searching for “" + q + "”" + "...");
        searchForImages(q);
    }
}
//# call checkQueryParams on page load
checkQueryParams();

// load cart link item count from cache
loadCartLink();

function searchForImages(searchText) {
    if (validateSearchString(searchText)) {
        changeSearchInfo("Searching for “" + searchText + "”" + "...");
        MuseumAPI.retrieveBySearchTerm(searchText).then(res => {
            searchAndDisplayByObjectIds(res.objectIDs);
            let artworkPluralize = res.total == 1  : "artworks";
            changeSearchInfo("Found " + res.total + " " + artworkPluralize + " for “" + searchText + "”");
        });
    }
}

function changeSearchInfo(str) {
    searchInfoElement.innerHTML = str;
}



function searchAndDisplayByObjectIds(objectIds) {
    SearchAPI.retrieveByObjectIds(objectIds)
        .then(retrievedThumbs => {
            displayResultsInHtml(retrievedThumbs)
        });
}

function displayResultsInHtml(retrievedThumbs) {
    const galleryContainer = new ThumbDocumentContainer();
    galleryContainer.clear();
    for (let thumb of retrievedThumbs) {
        galleryContainer.addThumbToDocument(thumb);
    }
}



// util functions
function validateSearchString(str) {
    if (str && str.trim()) {
        return str.trim();
    }
}