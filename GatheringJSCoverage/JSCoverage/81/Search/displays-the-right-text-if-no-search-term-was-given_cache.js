import {SearchItem} from "./search-item.js";

export async function retrieve(objectID) {
    const key = objectID;
    if(key in localStorage)  else {
        try {
            const url = api_object(objectID);
            const response = await fetch(url);
    }}



function api_object(objectID) {
    return `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`;
}
