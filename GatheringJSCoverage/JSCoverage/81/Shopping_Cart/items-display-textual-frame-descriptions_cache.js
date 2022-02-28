import {SearchItem} from "./search-item.js";

export async function retrieve(objectID) {
    const key = objectID;
    if(key in localStorage)  else {
        try {
            const url = api_object(objectID);
            const response = await fetch(url);
            const result = await response.json();
            const resultObject = new SearchItem(objectID, result.primaryImageSmall, result.artistDisplayName, result.title, result.objectDate);
            store(objectID, resultObject);
            return resultObject;
        }
    }}

function store(objectID, artworks) {
    const key = objectID;
    console.log(`Storing ${key} in local storage`);
    localStorage[key] = JSON.stringify(artworks);
}

function api_object(objectID) {
    return `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`;
}
