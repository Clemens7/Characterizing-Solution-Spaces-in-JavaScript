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
        (obj, index) => `
        <div class="thumb">
            <a href="config.html?objectID=${encodeURI(obj.objectID)}" id="object-${index}">
                <img src="${obj.image}" alt="Image of ${obj.title}" id="object-image-${index}">
                <div class="museum-label">
                    <span class="artist">${obj.artist}</span>
                    <span class="title">${obj.title}</span>,
                    <span class="date">${obj.date}</span>
                </div>
            </a>
        </div>`
    ).join('');
    document.getElementById('gallery').innerHTML = content;
}

document.addEventListener("DOMContentLoaded",() => {
    const params = (new URL(document.location)).searchParams;
    const query = params.get('q');
    setHeadingDuringSearch(query);
    populateGallery(query);
});