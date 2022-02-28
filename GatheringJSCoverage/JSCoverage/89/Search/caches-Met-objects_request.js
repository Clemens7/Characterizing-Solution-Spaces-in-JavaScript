/**
 * metart api wrapper
 * @param {String} term
 */
export function searchRequest(term) {
    return new Promise((res, rej) => {
        request(
            `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${term}&hasImages=true`
        )
            .then((data) => {
                if (data.objectIDs !== null) {
                    res(data);
                }
            })
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
export async function requestObjectInfo(objectID) {
    try {
        //load from cache
        const data = JSON.parse(
            localStorage.getItem(`cache-object-${objectID}`)
        );
        if (data.objectID) {
            return Promise.resolve(data);
        }
    }}

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
            .then((response) => {
                if (!response.ok) 
                res(response.json());
            })
            .catch(rej);
    });
}
