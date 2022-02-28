import { artService } from "./artService.js";





function searchingFor(term) {
    const searchInfo = document.getElementById("search-info");
    searchInfo.innerText = `Searching for “${term}”...`;
}



async function searchAndDisplay(q) {
    if (q && q.length > 0) {
        searchingFor(q);
        const objectIDs = await artService.search(q);}

document.addEventListener('DOMContentLoaded', event => {
    const urlParams = artService.getQueryParams("q");
    const q = urlParams.q;

    const search = document.getElementById("search");
    search.value = q;

    // Searching based of the URL Parameter, the search button redirects to the search page with a parameter
    searchAndDisplay(q);
});