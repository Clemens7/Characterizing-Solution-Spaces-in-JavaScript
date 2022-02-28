
const GET_OBJECT_API_URL = "https://collectionapi.metmuseum.org/public/collection/v1/objects/{ID}";
const CACHE_KEY = "cache";

let cache = {};

export function initCache(){
    if(!localStorage.getItem(CACHE_KEY)){
        localStorage.setItem(CACHE_KEY, "{}");
    }
    cache = JSON.parse(localStorage.getItem(CACHE_KEY));
}


export 

export 

export 

export 