import * as Dom from "./searchDom.js"
import * as Repo from "./searchRepo.js";

const container = document.getElementById("gallery");

document.addEventListener("DOMContentLoaded", evt => {
    const urlSearchParams = new URL(document.location).searchParams;
    let currentSearchQuery = "";
    if (urlSearchParams.has("q")) 

    const searchInput = document.getElementById("search");
    searchInput.value = currentSearchQuery;

    executeSearch(currentSearchQuery).then()
});

document.getElementById("search-form").addEventListener("submit", );

async function executeSearch(searchQuery) {
    if (searchQuery === "") {
        const highlights = await Repo.loadHighlights();)} for “${searchQuery}”`);
    Dom.loadElements(container, searchResult);
}


