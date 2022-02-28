export const retrieveByObjectID = 

export const storeArtwork = 

export const retrieve = searchTerm => {
    return JSON.parse(localStorage.getItem(searchTerm));
}

export const store = result => {
    localStorage.setItem(result.searchTerm, JSON.stringify(result.searchResult));
}