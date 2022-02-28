import StorageHandler from './storage-handler.js';
import {API} from './api.js';
import {showItemsDynamically} from "./cart.js";

window.onload = function () {
    console.log('document loaded');
    // StorageHandler.clearStorage();
    const searchForm = document.getElementsByClassName('search-form')[0];
    search();
    showItemsDynamically();
};

function search() {
    let text = '';
    if (location.search.startsWith('?q=')) {
        text = location.search.split('?q=')[1].replace('%2B',' ').replace('+',' ');
    }
    const searchInfo = document.getElementById('search-info');
    searchInfo.innerText = `Searching for “${text}”...`;
    if (text.trim() === '')  else {
        fetch(API.SEARCH + text + '&hasImages=true')
            .then(response => response.json())
            .then(res => {
                let foundCount = res.objectIDs.length;
                let artworkText = 'artworks';
                if (foundCount > 100) 
                if (foundCount === 1) 
                searchInfo.innerText = `Found ${foundCount} ${artworkText} for “${text}”`;
                return searchByObjectIDs(res.objectIDs.slice(0, 100));
            })
            .then(items => updateCollection(items))
            .catch();
    }
}

function updateCollection(items) {
    // clear gallery
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
    items.forEach(item => {
        gallery.appendChild(createCollectionHTML(item.objectID, 'config.html?objectID=' + item.objectID, item.primaryImageSmall ,item.title, item.artistDisplayName, item.title, item.objectDate));
    })
}



export function searchByObjectIDs(objectIDs) {
    let urls = [];
    const cachedItems = [];
    objectIDs.forEach(objectID => {
        const cachedObject = StorageHandler.getItemFromCache(objectID);
        if (cachedObject !== undefined)  else {
            urls.push(API.OBJECTS + objectID);
        }
    });

    if (urls.length === 0) 
    return Promise.all(urls.map(u=>fetch(u))).then(responses =>
        Promise.all(responses.map(res => {
            return res.json();
        })).then(items => {
            StorageHandler.addToCache(items);
            return items;
        })
    );
}


function createCollectionHTML(objectID, href, src, alt, artist, title, date) {
    const outerDIV = document.createElement('div');
    outerDIV.setAttribute('class', 'thumb');
    const innerDIV = document.createElement('div');
    innerDIV.setAttribute('class', 'museum-label');
    const anchor = document.createElement('a');
    anchor.setAttribute('href', href);
    anchor.setAttribute('id','object-' +  objectID);
    const img = document.createElement('img');
    img.setAttribute('src', src);
    img.setAttribute('alt', alt);
    img.setAttribute('id', 'object-image-' +  objectID );
    const spanArtist = document.createElement('span');
    spanArtist.setAttribute('class', 'artist');
    spanArtist.textContent = artist;
    const spanTitle = document.createElement('span');
    spanTitle.setAttribute('class', 'title');
    spanTitle.textContent = title + ', ';
    const spanDate = document.createElement('span');
    spanDate.setAttribute('class', 'date');
    spanDate.textContent = date;

    outerDIV.appendChild(anchor);
    anchor.appendChild(img);
    anchor.appendChild(innerDIV);
    innerDIV.appendChild(spanArtist);
    innerDIV.appendChild(spanTitle);
    innerDIV.appendChild(spanDate);

    return outerDIV;
}
