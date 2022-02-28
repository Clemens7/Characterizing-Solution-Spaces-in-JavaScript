import { Artwork, SearchValues } from "./Artwork.js";

export function retrieve(key) {
    if(key in localStorage) 
}

export function store(key, artworks) {
    console.log(`Storing ${key} in local storage`);
    localStorage[key] = JSON.stringify(artworks);
}