import {Painting} from "./painting.js";

export async function get_object_by_id(id) {
    let painting = Painting.retrieve(id);
    if(painting) {
        return painting;
    }}

export async function get_objects_by_ids(ids) {
    let paintings = [];

    for(let e of ids) {
        let painting = get_object_by_id(e);
        paintings.push(painting);
    }

    return new Promise((resolve) => {
        Promise.all(paintings).then(results => {resolve(results)});
    });
}

export 





// Helper function that 'wraps' URLs to go through a proxy
// See: https://github.com/Rob--W/cors-anywhere
// Basic Info on CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
// 
// Attention: Do this only for APIs you trust
// (or, as in this case, for demonstration purposes)
// There is a good reason why CORS restrictions exist:
// https://www.pivotpointsecurity.com/blog/cross-origin-resource-sharing-security/

