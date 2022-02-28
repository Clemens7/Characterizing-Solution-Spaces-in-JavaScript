const MET_API_ROOT = "https://collectionapi.metmuseum.org/public/collection/v1";
const MET_API_OBJECT_LOCATION = `${MET_API_ROOT}/objects`;
const MET_API_SEARCH_LOCATION = `${MET_API_ROOT}/search`;


export class MetArtwork {
    
}

export async function getArtworkById(id) {
    let cache = localStorage.getItem(`artmartMetObjCache-${id}`);
    if (cache) return JSON.parse(cache);}

export async function search(term) {
    const params = new URLSearchParams();
    params.set("q", term);
    params.set("hasImages", "true");
    let response = await fetch(`${MET_API_SEARCH_LOCATION}?${params.toString()}`);
    return await response.json();
}

