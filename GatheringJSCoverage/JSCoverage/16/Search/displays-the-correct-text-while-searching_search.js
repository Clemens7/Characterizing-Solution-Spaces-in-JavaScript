import { artService } from "./artService.js";

async function createElementsArtObjects(artObjectPromises, term) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
    let i = 0;
    for (let artObjectPromise of artObjectPromises) {
        gallery.appendChild(createArtObjectElement(await artObjectPromise));

        if (term) {
            foundArtworksFor(term, ++i);
        }
    }
    if (term) foundArtworksFor(term, i);
}

function createArtObjectElement(artObject) {
    const thumbnailURLContainer = document.createElement('div');
    thumbnailURLContainer.setAttribute('class', 'thumb');

    const link = document.createElement('a');
    link.setAttribute('href', `./config.html?objectID=${artObject.objectID}`);
    link.setAttribute('id', 'object-' + artObject.objectID);

    const img = document.createElement('img');
    img.setAttribute('src', artObject.imgUrl);
    img.setAttribute('alt', artObject.title);
    img.setAttribute('id', 'object-image-' + artObject.objectID);

    const labelContainer = document.createElement('div');
    labelContainer.setAttribute('class', 'museum-label');

    const artist = document.createElement('span');
    artist.setAttribute('class', 'artist');
    artist.innerText = artObject.artist;

    const title = document.createElement('span');
    title.setAttribute('class', 'title');
    title.innerText = artObject.title;

    const date = document.createElement('span');
    date.setAttribute('class', 'date');
    date.innerText = artObject.date;

    labelContainer.appendChild(artist);
    labelContainer.appendChild(title);
    labelContainer.append(', ');
    labelContainer.appendChild(date);

    link.appendChild(img);
    link.appendChild(labelContainer);

    thumbnailURLContainer.appendChild(link);
    return thumbnailURLContainer;
}

function searchingFor(term) {
    const searchInfo = document.getElementById("search-info");
    searchInfo.innerText = `Searching for “${term}”...`;
}

function foundArtworksFor(term, number) {
    const searchInfo = document.getElementById("search-info");
    if (number == 1) searchInfo.innerText = `Found ${number} artwork for “${term}”`;
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