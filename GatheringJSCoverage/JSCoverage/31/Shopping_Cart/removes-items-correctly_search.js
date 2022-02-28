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

export 



export async function getArtworkById(id) {
    let cachedArtwork = JSON.parse(localStorage.getItem(id));
    if(cachedArtwork) {
        return cachedArtwork;
    }
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
    

    

    
}