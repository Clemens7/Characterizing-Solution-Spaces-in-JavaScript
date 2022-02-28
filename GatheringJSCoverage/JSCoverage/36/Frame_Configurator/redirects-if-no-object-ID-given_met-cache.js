/**
 * Retrieves a list of artwork objects from local storage if present
 * @param searchTerm: searchTerm, also storage key
 * @returns an artwork object or nothing
 */
export function retrieve(searchTerm) {
    let lowerCaseSearch = searchTerm :undefined;
    if (lowerCaseSearch in localStorage) 
}

/**
 * Stores a list of artwork objects as string in local storage
 * Key is set to be searchTerm
 * @param searchTerm: key
 * @param artworks: value
 */
export 

/**
 * Retrieve an artwork from local storage if present
 * @param objectId: searchTerm, also storage key
 * @returns an artwork object or nothing
 */
export function retrieveObject(objectId) {
    if(objectId in localStorage)
}

/**
 * Stores an artwork object as string in local storage
 * Key is set to be searchTerm
 * @param artwork: value
 */
export 