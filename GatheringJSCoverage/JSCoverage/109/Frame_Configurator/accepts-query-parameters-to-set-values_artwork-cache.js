export function retrieve(objectID) {
    if(localStorage.artworks) {
        let artworks = new Map(JSON.parse(localStorage.artworks));
        return artworks.get(objectID);
    }
}

export function store(artwork) {
    let artworks;
    if(localStorage.artworks) {
        artworks = new Map(JSON.parse(localStorage.artworks));
    }
    artworks.set(artwork.objectID, artwork);
    localStorage.artworks = JSON.stringify(Array.from(artworks));
}