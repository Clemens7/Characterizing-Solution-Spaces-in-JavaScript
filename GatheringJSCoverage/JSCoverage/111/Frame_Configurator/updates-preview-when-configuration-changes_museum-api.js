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

export 

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


