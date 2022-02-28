import {Painting} from "./painting.js";

export 

export 

export async function get_objects_by_query(query) {
    const url = objects_by_query(query);
    try {
        const response = await fetch(url);
        const data = await response.json();
        let paintingIDs = data.objectIDs.slice(0, 100);
        return get_objects_by_ids(paintingIDs);
    }catch (e) {
        console.log('Error occured while retrieving paintings from url', url, ": ", e);
    }
}

function objects_by_query(query) {
    const API_URL = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${query}&hasImages=true`;
    //return cors_proxy_url(API_URL);
    return API_URL;
}



// Helper function that 'wraps' URLs to go through a proxy
// See: https://github.com/Rob--W/cors-anywhere
// Basic Info on CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
// 
// Attention: Do this only for APIs you trust
// (or, as in this case, for demonstration purposes)
// There is a good reason why CORS restrictions exist:
// https://www.pivotpointsecurity.com/blog/cross-origin-resource-sharing-security/

