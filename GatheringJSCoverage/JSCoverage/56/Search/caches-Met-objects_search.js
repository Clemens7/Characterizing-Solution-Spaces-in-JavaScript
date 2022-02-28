import * as Cache from './cache.js';

const baseUrl = "https://collectionapi.metmuseum.org/public/collection/v1/";

export async function retrieve(searchToken) {

    const cached = Cache.get(searchToken, Cache.CacheType.Search);
    if (cached) {
        return cached;
    }}











