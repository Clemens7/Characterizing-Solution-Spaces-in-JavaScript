import {displayCartItems} from './util.js';

document.addEventListener('DOMContentLoaded', evt => {
    const params = (new URL(document.location)).searchParams;
    const query = params.get('q');
    if (!query)  else {
        const searchInfo = document.getElementById('search-info');
        searchInfo.innerText = `Searching for “${query}”...`;
        artworkSearch(query);
    }
});

const form = document.querySelector('main form');
form.addEventListener('submit', );

async function artworkSearch(searchTerm) {
    await retrieveObjectIDsAsync(searchTerm);
}

export var Artworks = {
    serialize: ,
    parse: function (aw) {
        return aw.split(' ').join('+');
    }
};

async function retrieveObjectIDsAsync(searchterm) {
    const searchInfo = document.getElementById('search-info');
    const responseObjects = await fetch("https://collectionapi.metmuseum.org/public/collection/v1/search?q=" + Artworks.parse(searchterm) + "&hasImages=true");

    const rawData = await responseObjects.json();
    if (rawData.total === 1)  else {
        searchInfo.innerText = `Found ${rawData.total} artworks for “${searchterm}”`;
    }
    await getObjetsAsync(rawData);
}

async function getObjetsAsync(rawData) {

    let maxToShow = rawData.total > 100 ? 100 ;
    console.log(maxToShow);

    const results = await Promise.all(rawData.objectIDs.slice(0, maxToShow).map(async (object1) => {
        try {
            let x = ObjectsCache.retrieve(object1);
            if (x)  else {
                const responseDetails = await fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects/" + object1);
                const rawDataAW = await responseDetails.json();
                console.log(rawDataAW);
                const artWorkElement = new ArtWork(rawDataAW.objectID, rawDataAW.title, rawDataAW.artistDisplayName, rawDataAW.objectDate, rawDataAW.primaryImageSmall);
                ObjectsCache.store(object1, artWorkElement);
                const gallery = document.getElementById('gallery');
                gallery.appendChild(createOutput(artWorkElement));
                return artWorkElement;
            }
        }}));
}



function createOutput(artWork) {
    console.log(artWork);
    const thumb = document.createElement('div');
    thumb.className = "thumb";
    const link = document.createElement('a');
    link.href = "config.html?objectID=" + artWork.objectID; //TODO

    link.id = "object-".concat(artWork.objectID); //TODO
    const img = document.createElement('img');
    img.src = artWork.primaryImageSmall;
    img.alt = artWork.objectID;
    link.appendChild(img);
    const museumlLabel = document.createElement('div');
    museumlLabel.className = "museum-label";
    const artist = document.createElement('span');
    artist.className = "artist";
    artist.innerText = artWork.artistDisplayName;
    const title = document.createElement('span');
    title.className = "title";
    title.innerText = artWork.title;
    const date = document.createElement('span');
    date.className = "date";
    date.innerText = artWork.objectDate;
    const comma = document.createTextNode(', ');
    museumlLabel.appendChild(artist);
    museumlLabel.appendChild(title);
    museumlLabel.appendChild(comma);
    museumlLabel.appendChild(date);
    link.appendChild(museumlLabel);
    thumb.appendChild(link);
    return thumb;
}

export var ObjectsCache = {
    retrieve: function (key) {
        if (key in localStorage) 
    },
    store: function (key, artwork) {
        localStorage[key] = JSON.stringify(artwork);
    }
};

displayCartItems();

class ArtWork {
    constructor(objectID, title, artistDisplayName, objectDate, primaryImageSmall) {
        this.objectID = objectID;
        this.title = title;
        this.artistDisplayName = artistDisplayName;
        this.objectDate = objectDate;
        this.primaryImageSmall = primaryImageSmall;
    }
}