/**
 * metart api wrapper
 * @param {String} term
 */
export function searchRequest(term) {
    return new Promise((res, rej) => {
        request(
            `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${term}&hasImages=true`
        )
            .then()
            .catch(rej);
    });
}

/**
 *
 * @param {String} Country - short value AT|DE|CH|US
 */
export 

/**
 *
 * @param {Number} objectId
 */
export 

/**
 *
 * @param {Array} objects
 * @param {Number} total
 */
export 

/**
 *
 * @param {string} url
 */
export function request(url) {
    return new Promise((res, rej) => {
        fetch(url, {
            method: 'GET',
        })
            .then()
            .catch(rej);
    });
}
