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
export function getObjectsInfo(objects, total) {
    const result = {
        total: total,
        objects: [],
    };
    const workLoad = objects.map(requestObjectInfo);

    return new Promise((res, rej) => {
        Promise.all(workLoad).then((data) => {
            result.objects = data;
            res(result);
        });
    });
}

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
