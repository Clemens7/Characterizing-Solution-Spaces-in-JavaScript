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
    if (cached) 
    const responseJson = await fetch(`${baseUrl}objects/${objectID}`)
        .then(response => {
            if (!response.ok)  else {
                return response.json();
            }
        });
    let result = await responseJson;
    Cache.set(objectID, Cache.CacheType.ObjId, result);
    return result;
}
