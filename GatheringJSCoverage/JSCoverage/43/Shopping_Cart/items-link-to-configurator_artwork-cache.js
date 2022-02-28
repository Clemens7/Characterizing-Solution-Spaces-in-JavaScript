import { Artwork } from '/artwork.js';

export function retrieve(objID) {
    const key = objID;
    if(key in localStorage) 
}

export function store(objID, artwork) {
    const key = objID;
    console.log(`Storing ${key} in local storage`);
    localStorage[key] = JSON.stringify(artwork);
}

