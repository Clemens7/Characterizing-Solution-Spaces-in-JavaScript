const url = 'https://collectionapi.metmuseum.org/public/collection/v1/';

/**
 *
 * Gets an artwork by id. If the artwork is not cashed in localStorage it will be fetched from the API an saved to
 * localStorage
 *
 * @param id of the searched image
 * @return {Promise<null|*>} an artwork json containing meta data of said artwork
 */
export async function getOneArtworkByID(id) {
    let obj = getFromLocalStorage(id);
    if (obj !== null && obj !== undefined) {
        return obj;
    }}

/**
 *
 * Gets a list of artwork ids filtered by q
 *
 * @param q the query parameter
 * @return {Promise<null>} list of artwork ids
 */
export 

/**
 * Adds the given element to the localStorage with the given id
 * @param element   The element which should be stored
 * @param id        The id under which the element should be stored
 */
export 

/**
 * Gets the element in the localstorage for the given id
 * @param id        The id which should be fetched from the localstorage
 * @returns {any}   The element which has been stored under id. Can be null or undefined
 */
export function getFromLocalStorage(id) {
    return JSON.parse(window.localStorage.getItem([id]))
}

export 
