export const retrieveByObjectID = objectID => {
    return JSON.parse(localStorage.getItem(objectID));
}

export const storeArtwork = artwork => {
    localStorage.setItem(artwork.objectID, JSON.stringify(artwork));
}

export const retrieve = 

export const store = 