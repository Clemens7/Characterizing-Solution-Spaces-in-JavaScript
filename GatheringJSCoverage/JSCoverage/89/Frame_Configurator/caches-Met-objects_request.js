/**
 * metart api wrapper
 * @param {String} term
 */
export 

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
export 
