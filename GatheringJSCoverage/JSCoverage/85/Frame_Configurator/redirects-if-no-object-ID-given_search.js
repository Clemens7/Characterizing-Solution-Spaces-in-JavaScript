import {getArtworkById, search} from "./metArtwork.js";
import * as DOM from "./domElementHelper.js"

const HIGHLIGHTS_LOCATION = "highlights.json";
const CONFIG_LOCATION = "config.html";

const query = window.location.search;
const params = new URLSearchParams(query);
let searchTerm = params.get("q");
if (!searchTerm) {
    loadDefault();
}

function load(ids) {
    ids = ids.slice(0, 100);
    let promises = ids.map(id => getArtworkById(id).then(artwork => {
        return artwork;
    }));
    Promise.all(promises).then();
}

function loadDefault() {
    document.getElementById("search-info").innerText = "Search our collection of more than 400,000 artworks.";
    loadHighlightIds().then(results => {
        clearGallery();
        let artworks = results["highlights"];
        load(artworks);
    })
}

async function loadHighlightIds() {
    let response = await fetch(HIGHLIGHTS_LOCATION);
    return await response.json();
}





function clearGallery() {
    document.getElementById("gallery").innerHTML = "";
}


