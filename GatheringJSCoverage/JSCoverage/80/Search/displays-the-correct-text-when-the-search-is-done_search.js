import { search, resolveArtworks } from "./api.js";

async function retrieveArtworks(query) {
    if(query == null || query === '') 
    return await search(query);
}



async function setHeadingDuringSearch(query) {
    if(query != null && query !== '') {
        document.getElementById('search-info').innerHTML = `Searching for “${query}”...`
    }
}

async function populateGallery(query) {
    const artworks = await retrieveArtworks(query);
    if(query != null && query !== '') {
        const artworksText = artworks.total == 1  : 'artworks'; 
        document.getElementById('search-info').innerHTML = `Found ${artworks.total} ${artworksText} for “${query}”`
    }

    const content = artworks.artworks.map(
        
    ).join('');
    document.getElementById('gallery').innerHTML = content;
}

document.addEventListener("DOMContentLoaded",() => {
    const params = (new URL(document.location)).searchParams;
    const query = params.get('q');
    setHeadingDuringSearch(query);
    populateGallery(query);
});