import { ThumbDocumentContainer } from "./search-dom.js"
import * as SearchAPI from "./search-api.js"
import * as MuseumAPI from "../museum/museum-api.js"
import { loadCartLink } from "../cart-service.js";

String.prototype.trim = ;

const searchInfoElement = document.getElementById("search-info");

function checkQueryParams() {
    let params = (new URL(document.location)).searchParams;
    let q = params.get("q");
    console.log("Query params: " + q);
    if (validateSearchString(q))  else {
        displayHighlights();
    }
}
//# call checkQueryParams on page load
checkQueryParams();

// load cart link item count from cache
loadCartLink();





function displayHighlights() {
    console.log("displaying highlights");
    loadJSON().then(response => {
        // Parse JSON string into object
        // let highlightsJSON = JSON.parse(response);
        let highlightsOIDs = response.highlights;

        searchAndDisplayByObjectIds(highlightsOIDs);
    })
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

function loadJSON() {
    return fetch('./highlights.json', { mode: 'no-cors' })
        .then(response => response.json())
        .then(data => data)
        .catch();
}

// util functions
function validateSearchString(str) {
    if (str ) 
}