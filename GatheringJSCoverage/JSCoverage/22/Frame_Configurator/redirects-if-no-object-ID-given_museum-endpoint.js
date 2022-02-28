/**
 * retrieve information for a single artwork. Objects are cached
 *
 * @param {string} objectID
 * @returns {Promise<{date: (string|{min: number, max: number}), image: string, artist: (string|{middle: *}), id: *, title: (string|{words: *, punctuation: boolean}|string)}>}
 */
export async function retrieveArtworkInformation(objectID) {
    //check local storage
    let storage = window.localStorage;
    let data = storage["ObjectID"+objectID];
    if (!data) {
        //Object not cached
        const url = apiObjectUrl(objectID);
        try {
            const response = await fetch(url);
    }}

function apiObjectUrl(objectID) {
    return `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`;
}