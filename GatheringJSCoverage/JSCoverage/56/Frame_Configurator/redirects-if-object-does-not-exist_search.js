import * as Cache from './cache.js';

const baseUrl = "https://collectionapi.metmuseum.org/public/collection/v1/";

export async function retrieve(searchToken) {

    const cached = Cache.get(searchToken, Cache.CacheType.Search);
    if (cached) 

    try {
        if (searchToken === undefined) {
            const jsonContent = await getJson("highlights.json");
            return fetchIds(jsonContent.highlights);
        }}



async function fetchIds(idList) {
    let arrayIndex = 0;
    const promises = [];
    for (let i = 0; arrayIndex < 100 && i < idList.length; i++) {
        const promise = fetchItem(idList[i]);
        if (promise) {
            promises.push(promise);
            arrayIndex++;
        }
    }
    const array = await Promise.all(promises);}



async function fetchItem(id) {
    return await getJson(`${baseUrl}objects/${id}`);
}


async function getJson(url) {
    const response = await fetch(url);
    return await response.json();
}
