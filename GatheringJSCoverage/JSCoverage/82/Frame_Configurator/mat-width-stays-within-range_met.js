//Request to metapi for id of all objects format {total, ids[]}
const URLID = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';
//Image (primaryImage)
const URLIMAGE = '"https://images.metmuseum.org/CRDImages/ep/original/';
//Smaller file size image (primaryImageSmall)
const URLLARGEIMAGE = 'https://images.metmuseum.org/CRDImages/ep/web-large/';
//Url to the image sav
//Search
const SEARCHURL = 'https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=';
// //Search term should be stored in q
/**
 *
 * @param term The term that is searched for with the mets api.
 * @return Returns an object with "total" retrieved objects and objectIDs as an array
 */
export 

/**
 *
 * @param id Retrieve an object with this id from the met api
 * @return A object that contains information about the artwork.
 */

export function retrieveObject(id) {
    return fetch(URLID + id)
        .then((response) => {
            if (!response.ok) 
            return response.json();
        });
}

/**
 *
 * @param ids an array of ids
 * @return [] array of all the artworks with the given ids as promises.
 */

export 