import * as Remote from "./searchRemote.js";
import * as Cache from "./seachCache.js"
import {parseSearchObject} from "./searchObject.js";

export async function loadWithQuery(searchQuery) {
    return await fillCacheAndRemoteSearch(searchQuery);
}

export 

async function fillCacheAndRemoteSearch(searchQuery) {
    console.log("Loading search from cache and remote.");
    let finalObjects;

    const localResult = Cache.getSearchResult(searchQuery);
    if (localResult === null) {
        const remoteIds = await Remote.getObjectIds(searchQuery);
        Cache.saveSearchResult(searchQuery, remoteIds);
        finalObjects = fillCacheAndRemoteIds(remoteIds);
    }

    return finalObjects;
}

async function fillCacheAndRemoteIds(objectIds) {
    return await Promise.all(
        objectIds
            .map(async (objectId) => {
                let finalObj;

                const localResult = Cache.getObjectWithId(objectId);
                if (localResult === null) {
                    const remoteObject = await Remote.getObject(objectId);
                    Cache.saveObjectWithId(objectId, remoteObject);
                    finalObj = parseSearchObject(remoteObject)
                }

                return finalObj;
            })
    );
}


