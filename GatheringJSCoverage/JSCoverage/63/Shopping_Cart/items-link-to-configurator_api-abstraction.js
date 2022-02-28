
const GET_OBJECT_API_URL = "https://collectionapi.metmuseum.org/public/collection/v1/objects/{ID}";
const CACHE_KEY = "cache";

let cache = {};

export function initCache(){
    if(!localStorage.getItem(CACHE_KEY))
    cache = JSON.parse(localStorage.getItem(CACHE_KEY));
}


export async function getItem(id){
    let item = getItemFromLocalStorage(id);
    if(item)
    else{
        item = await getItemFromApi(id);
        if(item.message)
        saveItemToLocalStorage(item);
        return item;
        
    }}

export async function getItemFromApi(id){
    console.log("GOT ITEM FROM API");
    const response = await fetch(GET_OBJECT_API_URL.replace('{ID}', id));
    const rawData = await response.json();
    return rawData;
}

export function getItemFromLocalStorage(id){
    return cache[id];
}

export function saveItemToLocalStorage(item){
    cache[item.objectID] = item;
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
}