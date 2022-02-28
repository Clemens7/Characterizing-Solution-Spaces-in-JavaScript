export function retrieve(objectID) {
    if(localStorage.artworks) {
        let artworks = new Map(JSON.parse(localStorage.artworks));
        return artworks.get(objectID);
    }
}

export 