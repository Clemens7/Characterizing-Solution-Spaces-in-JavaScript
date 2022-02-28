import { fetchJsonFromAPI } from './cache.js';
import { updateHeaderCartCount } from './cart.js'


const API = 'https://collectionapi.metmuseum.org/public/collection/v1';

const form = document.querySelector('main form');

document.addEventListener('DOMContentLoaded', event => {
    const params = (new URL(document.location)).searchParams;
    const queryParam = params.get('q');
    updateHeaderCartCount();
    if (!queryParam) 
    artworkSearch(queryParam);
});

form.addEventListener('submit', );


async function artworkSearch(query) {
    const searchInfo = document.querySelector("#search-info");
    searchInfo.innerText = `Searching for “${query}”...`;
    const IDs = await retrieveArtworkIDs(query);
    const artworks = await getArtworks(IDs);
    searchInfo.innerText = `Found ${artworks.length} artwork${(artworks.length == 1)  : 's'} for “${query}”`;
    for(let artwork of artworks) {
        gallery.appendChild(createGalleryItem(artwork));
    }
}




async function retrieveArtworkIDs(query) {
    const searchResponse = await fetch(`${API}/search?hasImages=true&q=${query}`);
    const rawData = await searchResponse.json();
    if (rawData.total == 0) 
    const IDs = rawData.objectIDs.splice(0, 100);
    return IDs;
}

async function getArtworks(IDs) {
    return Promise.all(IDs.map(ID =>
        fetchJsonFromAPI(ID)
        .then(response => new Artwork(
            response.objectID,
            response.artistDisplayName,
            response.title,
            response.objectDate,
            response.primaryImageSmall,
        ))));
}

function createGalleryItem(artwork) {
    const outerContainer = document.createElement('div');
    outerContainer.className = 'thumb';

    const innerContainer = document.createElement('a');
    innerContainer.id = `object-${artwork.id}`;

    const imageContainer = document.createElement('a');
    imageContainer.href = `./config.html?objectID=${artwork.id}`;

    const image = document.createElement('img');
    image.id = `object-image-${artwork.id}`;
    image.src = artwork.imgsrc;
    image.alt = artwork.title;

    const label = document.createElement('div');
    label.className = 'museum-label';

    const artistSpan = document.createElement('span');
    artistSpan.className = 'artist';
    artistSpan.innerText = artwork.artist;

    const titleSpan = document.createElement('span');
    titleSpan.className = 'title';
    titleSpan.innerText = artwork.title;

    const comma = document.createTextNode(', ');

    const dateSpan = document.createElement('span');
    dateSpan.className = 'date';
    dateSpan.innerText  = artwork.date;

    outerContainer.appendChild(innerContainer);
    innerContainer.appendChild(imageContainer);
    imageContainer.appendChild(image);
    innerContainer.appendChild(label);
    label.appendChild(artistSpan);
    label.appendChild(titleSpan);
    label.appendChild(comma);
    label.appendChild(dateSpan);

    return outerContainer;
}


class Artwork {
    constructor(id, artist, title, date, imgsrc) {
        this.id=id;
        this.artist=artist;
        this.title=title;
        this.date=date;
        this.imgsrc=imgsrc;
    }
}

