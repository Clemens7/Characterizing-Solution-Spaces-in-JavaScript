import {SearchItem} from "./search-item.js";

export async function retrieve(objectID) {
    const key = objectID;
    if(key in localStorage) {
        console.log(`Retrieving ${key} from local storage`);
        return JSON.parse(localStorage[key]);
    }}




