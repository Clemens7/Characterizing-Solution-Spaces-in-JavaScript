import * as Cache from './cache.js';

const baseUrl = "https://collectionapi.metmuseum.org/public/collection/v1/";

export async function retrieve(searchToken) {

    const cached = Cache.get(searchToken, Cache.CacheType.Search);
    if (cached) 

    try {
        if (searchToken === undefined) 
        const fetched = await fetchData(searchToken);
        Cache.set(searchToken, Cache.CacheType.Search, fetched);
        return fetched;
    }}

async function fetchData(searchToken) {
    const idList = await fetchSearch(searchToken);
    if (!idList) {
        return;
    }}



async function fetchSearch(searchToken) {
    const request = `${baseUrl}search?q=${searchToken.replace(' ', '+')}&hasImages=true&artistOrCulture=true`;
    const data = await getJson(request);
    return data.objectIDs;
}




async function getJson(url) {
    const response = await fetch(url);
    return await response.json();
}
