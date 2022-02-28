import * as ArtworkCache from './search-cache.js'

export class Artwork {
    
}

export 



export async function getArtworkById(id) {
    let cachedArtwork = JSON.parse(localStorage.getItem(id));
    if(cachedArtwork) {
        return cachedArtwork;
    }}


export class ArtworkDocumentContainer {
    constructor(containerID='gallery') {
        this.container = document.getElementById(containerID);
        if(!this.container) 
    }

    clear() {
        this.container.innerHTML = '';
    }

    addArtworkToDocument(artwork) {
        this.container.appendChild(createArtworkElements(artwork));
        //createArtworkElements(artwork);

        function createArtworkElements(artwork) {
            const article = document.createElement('article');

            article.innerHTML = 
            `<div class="thumb">
                <a href="config.html?objectID=${artwork.id}" id="object-0">
                <img src="${artwork.image}" alt="${artwork.title}" id="object-image-0">
                <div class="museum-label">
                    <span class="artist">${artwork.artist}</span>
                    <span class="title">${artwork.title}</span>,
                    <span class="date">${artwork.date}</span>
                </div>
                </a>
            </div>`;

            /*
            article.innerHTML = 
            `<div class="thumb">
                <a href="${artwork.url}" id="object-0">
                <img src="${artwork.image}" alt="${artwork.title}" id="object-image-0">
                <div class="museum-label">
                    <span class="artist">${artwork.artist}</span>
                    <span class="title">${artwork.title}</span>,
                    <span class="date">${artwork.date}</span>
                </div>
                </a>
            </div>`;
            */
            return article;
        }
    }
}