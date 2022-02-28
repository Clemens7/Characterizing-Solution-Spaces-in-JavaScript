import {getArtworkById, search} from "./metArtwork.js";
import * as DOM from "./domElementHelper.js"

const HIGHLIGHTS_LOCATION = "highlights.json";
const CONFIG_LOCATION = "config.html";

const query = window.location.search;
const params = new URLSearchParams(query);
let searchTerm = params.get("q");
if (!searchTerm)  else {
    searchTerm = searchTerm.replace("+", " ");
    document.getElementById("search").value = searchTerm;
    document.getElementById("search-info").innerText = `Searching for “${searchTerm}”...`;
    search(searchTerm).then(results => {
        clearGallery();
        let count = results["total"];
        let artworks = results["objectIDs"];
        if (artworks) 
        document.getElementById("search-info")
            .innerText = `Found ${count} ${count === 1  : "artworks"} for “${searchTerm}”`;
    });
}











function clearGallery() {
    document.getElementById("gallery").innerHTML = "";
}


