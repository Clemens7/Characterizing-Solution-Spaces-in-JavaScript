import * as Cache from './cache.js';

const baseUrl = "https://collectionapi.metmuseum.org/public/collection/v1/";

export async function retrieve(searchToken) {

    const cached = Cache.get(searchToken, Cache.CacheType.Search);
    if (cached) 

    try {
        if (searchToken === undefined) 
        const fetched = await fetchData(searchToken);}

async function fetchData(searchToken) {
    const idList = await fetchSearch(searchToken);}



async function fetchSearch(searchToken) {
    const request = `${baseUrl}search?q=${searchToken.replace(' ', '+')}&hasImages=true&artistOrCulture=true`;
    const data = await getJson(request);}




async function getJson(url) {
    const response = await fetch(url);}
