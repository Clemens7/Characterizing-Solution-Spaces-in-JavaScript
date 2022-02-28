import { artService } from "./artService.js";

async function createElementsArtObjects(artObjectPromises, term) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
    let i = 0;
    for (let artObjectPromise of artObjectPromises) 
    if (term) foundArtworksFor(term, i);
}



function searchingFor(term) {
    const searchInfo = document.getElementById("search-info");
    searchInfo.innerText = `Searching for “${term}”...`;
}

function foundArtworksFor(term, number) {
    const searchInfo = document.getElementById("search-info");
    if (number == 1) 
    else searchInfo.innerText = `Found ${number} artworks for “${term}”`;
}

async function searchAndDisplay(q) {
    if (q && q.length > 0) {
        searchingFor(q);
        const objectIDs = await artService.search(q);
        const objectIDPromises = artService.getArtObjectPromises(objectIDs);
        createElementsArtObjects(objectIDPromises, q);
    }
}

document.addEventListener('DOMContentLoaded', event => {
    const urlParams = artService.getQueryParams("q");
    const q = urlParams.q;

    const search = document.getElementById("search");
    search.value = q;

    // Searching based of the URL Parameter, the search button redirects to the search page with a parameter
    searchAndDisplay(q);
});