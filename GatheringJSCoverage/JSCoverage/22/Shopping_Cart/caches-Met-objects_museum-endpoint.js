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
    if (!data)  else {
        //Object cached
        data = JSON.parse(data);
    }
    return {id:objectID, artist:data.artistDisplayName, title:data.title, date:data.objectDate, image:data.primaryImageSmall};
}

