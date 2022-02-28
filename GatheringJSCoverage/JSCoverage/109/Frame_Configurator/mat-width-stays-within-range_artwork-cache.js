export function retrieve(objectID) {
    if(localStorage.artworks)         
    else
        return null;
}

export function store(artwork) {
    let artworks;
    if(localStorage.artworks) 
    else {
        artworks = new Map();
    }
    artworks.set(artwork.objectID, artwork);
    localStorage.artworks = JSON.stringify(Array.from(artworks));
}