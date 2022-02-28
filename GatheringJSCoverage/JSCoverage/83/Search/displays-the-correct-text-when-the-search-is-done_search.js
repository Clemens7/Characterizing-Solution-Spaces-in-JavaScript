import * as Dom from "./searchDom.js"
import * as Repo from "./searchRepo.js";

const container = document.getElementById("gallery");

document.addEventListener("DOMContentLoaded", evt => {
    const urlSearchParams = new URL(document.location).searchParams;
    let currentSearchQuery = "";
    if (urlSearchParams.has("q")) {
        currentSearchQuery = urlSearchParams.get("q");
    }

    const searchInput = document.getElementById("search");
    searchInput.value = currentSearchQuery;

    executeSearch(currentSearchQuery).then()
});

document.getElementById("search-form").addEventListener("submit", );

async function executeSearch(searchQuery) {
    if (searchQuery === "") 

    console.log(`Staring search with query: ${searchQuery}.`);
    setIndicator(`Searching for “${searchQuery}”...`);

    const searchResult = await Repo.loadWithQuery(searchQuery);
    setIndicator(`Found ${searchResult.length + ((searchResult.length === 1)  : " artworks")} for “${searchQuery}”`);
    Dom.loadElements(container, searchResult);
}

function setIndicator(indicator) {
    const searchInfo = document.getElementById("search-info");
    searchInfo.innerText = indicator;
}
