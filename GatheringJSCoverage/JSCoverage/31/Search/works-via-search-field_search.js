import * as ArtworkCache from './search-cache.js'

export class Artwork {
    constructor(id, title, artist, date, url, image) {
        this.id = id;
        this.title = title;
        this.artist = artist;
        this.date = date;
        this.url = url;
        this.image = image;
    }
}

export async function retrieveArtwork(searchTerm) {
    //console.log(searchTerm);



    console.log(1);
    const response = fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${searchTerm}`);
    return response
        .then(value => {
            console.log(2);
            if (value.ok) {
                return value.json();
            }
        })
        .then(rawData => rawData.objectIDs)
        .then(results => {
            console.log(3)
            let length = 0;
            if (results != null) {
            length = results.length;
            results = results.splice(0,100);
            }
            const foundText = document.getElementById('search-info');
            if (length == 1)  else {
            foundText.innerHTML = `Found ${length} artworks  for “${searchTerm}”`;  
            }
            return results;
            })
    /*
    console.log(2);
    const rawData = await response.json();
    console.log(3);
    let results = await rawData.objectIDs;
    console.log(4);
    let length = results.length;
    results = results.splice(0,100);
    //console.log(results);
    //const artworks = createArtworksArray(results);
    const foundText = document.getElementById('search-info');
    foundText.innerHTML = `Found ${length} artworks  for “${searchTerm}”`;
    //console.log(artworks[1]);
    return results;
    */
}



export async function getArtworkById(id) {
    let cachedArtwork = JSON.parse(localStorage.getItem(id));
    if(cachedArtwork) 
    const response = fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
    return response
        .then(value => {
            if (value.ok) {
                return value.json()
            }
        })
        .then(rawData => new Artwork(
            rawData.objectID, 
            rawData.title,
            rawData.artistDisplayName, 
            rawData.objectDate,
            `config.html?${rawData.objectID}`, 
            rawData.primaryImageSmall
            ))
        .then(artwork => {
                localStorage.setItem(id,JSON.stringify(artwork));
                return artwork;
            })
}


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