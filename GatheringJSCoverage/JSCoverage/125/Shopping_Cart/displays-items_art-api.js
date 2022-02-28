import { Art,ObjectsList,SearchList } from './art.js';
import * as ArtCache from './art-cache.js'

const MET_BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/';

/**
 * Cache of available search items
 * @type(ObjectsList[])
 */
export let art_collection = [];

/**
 * Cache of all available object items
 * @type(number[])
 */
export let IDList = [];

/*
 * API calls
 */

/**
 * Returns an object from the MOMA Api by objectID.
 * @returns {Promise<Response>}
 */

export async function retrieve(objectID) {

    console.log("Calling the object endpoint:")
    console.log(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)

    let art = ArtCache.retrieve(objectID);
    if (!art) {
        const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);
        if (response.ok) {
            art = await response.json();
            console.log("response ok");
            ArtCache.store(art);
        }
    }
    return art;
}

/**
 * Returns a list of objects by searchTerm from MOMA Api
 * @param searchTerm
 * @returns {Promise<Response>}
 */
export 

/*
    return fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${searchTerm}`)
        .then(response => {
            console.log("call to MOMA Api with search: "+searchTerm.value)
            return response.json()
        }).then(value => {
            console.log(" call successfull: IDList"+ IDList.length)
            return IDList = value.objectIDs;
        }).catch(reason => {
            console.log(reason);
            return [];
        });*/


export 

export 


/**
 * Returns a list of objects by searchTerm from MOMA Api
 * @param searchTerm
 * @returns {Promise<Response>}
 */
export 

// https://collectionapi.metmuseum.org/public/collection/v1/search
// search request url


// https://collectionapi.metmuseum.org/public/collection/v1/objects
// we get total num of objects and then a list of objectID's -- (GET ALL)



// https://collectionapi.metmuseum.org/public/collection/v1/objects/[objectID]
// retrieve information about specific object by ID -- (GET BY ID)


// Helper function that 'wraps' URLs to go through a proxy
// See: https://github.com/Rob--W/cors-anywhere
// Basic Info on CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
//
// Attention: Do this only for APIs you trust
// (or, as in this case, for demonstration purposes)
// There is a good reason why CORS restrictions exist:
// https://www.pivotpointsecurity.com/blog/cross-origin-resource-sharing-security/

