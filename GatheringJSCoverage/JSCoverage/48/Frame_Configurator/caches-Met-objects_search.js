import StorageHandler from './storage-handler.js';
import {API} from './api.js';
import {showItemsDynamically} from "./cart.js";

window.onload = ;







export function searchByObjectIDs(objectIDs) {
    let urls = [];
    const cachedItems = [];
    objectIDs.forEach(objectID => {
        const cachedObject = StorageHandler.getItemFromCache(objectID);
        if (cachedObject !== undefined) {
            cachedItems.push(cachedObject);
        }
    });

    if (urls.length === 0) {
        return new Promise(resolve => resolve(cachedItems));
    }}



