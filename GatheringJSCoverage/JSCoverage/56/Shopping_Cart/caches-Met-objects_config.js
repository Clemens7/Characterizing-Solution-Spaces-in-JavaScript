import * as Frame from './frame.js';
import * as Cache from './cache.js';

const baseUrl = "https://collectionapi.metmuseum.org/public/collection/v1/";

export 

export 

export 

export 

export 

export 

export 

export async function loadObject(objectID) {
    const cached = Cache.get(objectID, Cache.CacheType.ObjId);
    if (cached) {
        return cached;
    }}
