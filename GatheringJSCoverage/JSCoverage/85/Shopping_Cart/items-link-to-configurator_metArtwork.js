const MET_API_ROOT = "https://collectionapi.metmuseum.org/public/collection/v1";
const MET_API_OBJECT_LOCATION = `${MET_API_ROOT}/objects`;
const MET_API_SEARCH_LOCATION = `${MET_API_ROOT}/search`;


export class MetArtwork {
    constructor(id, image, artist, title, date) {
        this.id = id;
        this.image = image;
        this.artist = artist;
        this.title = title;
        this.date = date;
    }
}

export async function getArtworkById(id) {
    let cache = localStorage.getItem(`artmartMetObjCache-${id}`);
    if (cache) 
    let response = await fetch(`${MET_API_OBJECT_LOCATION}/${id}`);
    if (response.status >= 400) 
    let data = await response.json();
    let artwork = new MetArtwork(id, data.primaryImageSmall, data.artistDisplayName, data.title, data.objectDate);
    localStorage.setItem(`artmartMetObjCache-${id}`, JSON.stringify(artwork));
    return artwork;
}

export 

