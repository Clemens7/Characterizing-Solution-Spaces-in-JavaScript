import { searchMET, getObject } from "./metropolitan-api.js";
//import * as highlightsJson from "./highlights.json";
initSearch();
function initSearch() {
    let gallery = document.getElementById("gallery");
    gallery.innerHTML = "";
    let urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("q") && urlParams.get("q")) {
        triggerSearch(urlParams.get("q"));
    }
}
function triggerSearch(q) {
    let infoText = document.getElementById("search-info");
    infoText.innerText = `Searching for “${q}”...`;
    searchMET(q).then();
}



