import StorageHandler from './storage-handler.js';
import {API} from './api.js';
import {showItemsDynamically} from "./cart.js";

window.onload = ;







export function searchByObjectIDs(objectIDs) {
    let urls = [];
    const cachedItems = [];
    objectIDs.forEach(objectID => {
        const cachedObject = StorageHandler.getItemFromCache(objectID);
        if (cachedObject !== undefined)  else {
            urls.push(API.OBJECTS + objectID);
        }
    });

    if (urls.length === 0) 
    return Promise.all(urls.map(u=>fetch(u))).then(responses =>
        Promise.all(responses.map(res => {
            return res.json();
        })).then(items => {
            StorageHandler.addToCache(items);
            return items;
        })
    );
}



