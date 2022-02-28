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
        if (data.objectID) 
    }catch (e) {
        //load from api
        return new Promise((res, rej) => {
            request(
                `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
            )
                .then((data) => {
                    localStorage.setItem(
                        `cache-object-${objectID}`,
                        JSON.stringify(data)
                    );
                    res(data);
                })
                .catch();
        });
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
