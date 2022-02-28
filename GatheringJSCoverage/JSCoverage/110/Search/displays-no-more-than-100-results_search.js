import * as MuseumAPI from '../metmuseum/museum-api.js'
import * as DOM from '../helpers/dom.js';
import * as UTIL from '../helpers/utils.js';
import { Artwork } from '../metmuseum/artwork-model.js';

export let q = UTIL.getSearchParam("q");
const searchButton = document.getElementById('search-button');
searchButton.addEventListener("click", search);


function initCheck() {
    if (q) {
        let info = document.getElementById('search-info');
        info.innerText = 'Searching for “' + q + '”...';
        artSearch(q);
    }
}



async function artSearch(searchTerm) {
    const artworks = await retrieveArtItems(searchTerm);

    const section = document.getElementById('gallery');
    section.innerHTML = "";
    for (let art of artworks) {
        section.appendChild(createArtElement(art));
    }
}

function createArtElement(art) {
    const outerdiv = document.createElement('div');
    outerdiv.setAttribute('class', 'thumb');

    const a = document.createElement('a');
    a.href = "./config.html?objectID=" + art.objectID;
    a.id = "object-0";

    const img = document.createElement('img');
    img.src = art.img;
    img.alt = art.title;
    img.id = "object-image-0";

    const innerdiv = document.createElement('div');
    innerdiv.setAttribute('class', 'museum-label');

    const artistSpan = document.createElement('span');
    artistSpan.setAttribute('class', 'artist');
    artistSpan.innerText = art.artist;

    const titleSpan = document.createElement('span');
    titleSpan.setAttribute('class', 'title');
    titleSpan.innerText = art.title;
    titleSpan.innerText += ", ";

    const dateSpan = document.createElement('span');
    dateSpan.setAttribute('class', 'date');
    dateSpan.innerText = art.date;

    innerdiv.appendChild(artistSpan);
    innerdiv.appendChild(titleSpan);
    innerdiv.appendChild(dateSpan);
    a.appendChild(img);
    a.appendChild(innerdiv);
    outerdiv.appendChild(a);

    return outerdiv;
}

async function retrieveArtItems(searchTerm) {
    let info = document.getElementById('search-info');
    try {
        if (searchTerm == "")  else {
            const artworks = await MuseumAPI.getArtworksWithImageBySearchTerm(searchTerm);

            let numberArts = (await artworks).length;
            if (numberArts == 1)  else {
                info.innerText = 'Found ' + numberArts + ' artworks for “' + q + '”';
            }
            return artworks;
        }
    }}

DOM.onReady(initCheck());