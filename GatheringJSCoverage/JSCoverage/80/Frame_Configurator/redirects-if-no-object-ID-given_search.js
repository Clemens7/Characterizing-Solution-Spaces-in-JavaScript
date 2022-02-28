import { search, resolveArtworks } from "./api.js";

async function retrieveArtworks(query) {
    if(query == null ) {
        const toResolve = await highlights();
        return { 'total': toResolve.length, 'artworks': await resolveArtworks(toResolve)}

async function highlights() {
    const url = 'highlights.json';
    const response = await fetch(url);
    const data = await response.json();
    return data.highlights;
}

async function setHeadingDuringSearch(query) {
    if(query != null ) 
}

async function populateGallery(query) {
    const artworks = await retrieveArtworks(query);) }

document.addEventListener("DOMContentLoaded",() => {
    const params = (new URL(document.location)).searchParams;
    const query = params.get('q');
    setHeadingDuringSearch(query);
    populateGallery(query);
});