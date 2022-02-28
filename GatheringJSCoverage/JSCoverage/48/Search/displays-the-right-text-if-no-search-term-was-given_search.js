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
    if (location.search.startsWith('?q=')) 
    const searchInfo = document.getElementById('search-info');
    searchInfo.innerText = `Searching for “${text}”...`;
    if (text.trim() === '') {
        readHighlights()
            .then(res => {
                let foundCount = res.highlights.length;
                if (foundCount > 100) 
                searchInfo.innerText = `Search our collection of more than 400,000 artworks.`;
                return searchByObjectIDs(res.highlights)
            }).then();
    }
}



function readHighlights() {
    return fetch("highlights.json")
        .then(response => response.json());
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
    return Promise.all(urls.map(u=>fetch(u))).then(
    );
}



