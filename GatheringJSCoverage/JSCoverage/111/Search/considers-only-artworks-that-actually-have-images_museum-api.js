import * as MuseumCache from "../cache-api.js";
import * as CONSTANTS from "./museum-constants.js";
import {Thumb} from "../thumb.js";

export 

export async function retrieveBySearchTerm(searchTerm) {
    const url = search_api_url(searchTerm);
    return await fetchObjects(url).then();
}

async function fetchObjects(url) {
    return fetch(url)
        .then()
        .then()
        .catch();
}

//API-URLS


function search_api_url(searchTerm) {
    return CONSTANTS.METMUESUM_API.SEARCH + "?q=" + searchTerm + CONSTANTS.METMUESUM_API.HAS_IMAGE;
}
