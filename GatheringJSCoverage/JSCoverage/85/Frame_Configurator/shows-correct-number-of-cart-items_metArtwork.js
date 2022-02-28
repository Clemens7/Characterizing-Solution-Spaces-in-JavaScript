const MET_API_ROOT = "https://collectionapi.metmuseum.org/public/collection/v1";
const MET_API_OBJECT_LOCATION = `${MET_API_ROOT}/objects`;
const MET_API_SEARCH_LOCATION = `${MET_API_ROOT}/search`;


export class MetArtwork {
    
}

export async function getArtworkById(id) {
    let cache = localStorage.getItem(`artmartMetObjCache-${id}`);
    if (cache) return JSON.parse(cache);}

export 

