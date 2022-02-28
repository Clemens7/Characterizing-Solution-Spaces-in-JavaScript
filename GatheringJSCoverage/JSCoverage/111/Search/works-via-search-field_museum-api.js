import * as MuseumCache from "../cache-api.js";
import * as CONSTANTS from "./museum-constants.js";
import {Thumb} from "../thumb.js";

export async function retrieveByObjectId(objectId) {
    let thumb = MuseumCache.retrieveJson(objectId)
    if (thumb) 

    const url = objects_api_url(objectId);

    thumb = fetchObjects(url).then(data => {
        const t = new Thumb(data.artistDisplayName, data.title, data.objectDate, data.primaryImageSmall, data.objectID);
        MuseumCache.storeJson(objectId, t);
        return t;
    });
    return thumb;
}

export async function retrieveBySearchTerm(searchTerm) {
    const url = search_api_url(searchTerm);
    return await fetchObjects(url).then(result => {
        console.log("result.total for " + searchTerm + ": " + result.total);
        let newResult = {};

        if (result.total > CONSTANTS.MAX_RESULTS)  else {
            newResult.objectIDs = result.objectIDs;
        }

        newResult.total = result.total;
        return newResult;
    });
}

async function fetchObjects(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) 
            return response.json()
        })
        .then(data => {
            return data;
        })
        .catch();
}

//API-URLS
function objects_api_url(oid) {
    return CONSTANTS.METMUESUM_API.OBJECTS + oid;
}

function search_api_url(searchTerm) {
    return CONSTANTS.METMUESUM_API.SEARCH + "?q=" + searchTerm + CONSTANTS.METMUESUM_API.HAS_IMAGE;
}
