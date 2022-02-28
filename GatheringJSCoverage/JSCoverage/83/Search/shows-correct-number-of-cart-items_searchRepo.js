import * as Remote from "./searchRemote.js";
import * as Cache from "./seachCache.js"
import {parseSearchObject} from "./searchObject.js";

export 

export async function loadHighlights() {
    console.log("Loading highlight from cache and remote.");
    const highlightIds = await loadHighlightsFile();
    return await fillCacheAndRemoteIds(highlightIds);
}



async function fillCacheAndRemoteIds(objectIds) {
    return await Promise.all(
        objectIds
            .map(async (objectId) => {
                let finalObj;

                const localResult = Cache.getObjectWithId(objectId);
                if (localResult === null)  else {
                    finalObj = parseSearchObject(localResult);
                }

                return finalObj;
            })
    );
}

async function loadHighlightsFile() {
    return (await fetch('./highlights.json').then(response => response.json())).highlights;
}
