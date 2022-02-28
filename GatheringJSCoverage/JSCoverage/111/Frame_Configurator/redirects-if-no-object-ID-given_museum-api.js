import * as MuseumCache from "../cache-api.js";
import * as CONSTANTS from "./museum-constants.js";
import {Thumb} from "../thumb.js";

export async function retrieveByObjectId(objectId) {
    let thumb = MuseumCache.retrieveJson(objectId)
    if (thumb) 

    const url = objects_api_url(objectId);

    thumb = fetchObjects(url).then();
    return thumb;
}

export 

async function fetchObjects(url) {
    return fetch(url)
        .then()
        .then()
        .catch();
}

//API-URLS
function objects_api_url(oid) {
    return CONSTANTS.METMUESUM_API.OBJECTS + oid;
}


