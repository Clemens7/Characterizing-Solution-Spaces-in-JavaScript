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
    if (!idList) 
    return await fetchIds(idList);
}

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
    const array = await Promise.all(promises);
    return array;
}

async function fetchSearch(searchToken) {
    const request = `${baseUrl}search?q=${searchToken.replace(' ', '+')}&hasImages=true&artistOrCulture=true`;
    const data = await getJson(request);
    return data.objectIDs;
}

async function fetchItem(id) {
    return await getJson(`${baseUrl}objects/${id}`);
}


async function getJson(url) {
    const response = await fetch(url);
    return await response.json();
}
