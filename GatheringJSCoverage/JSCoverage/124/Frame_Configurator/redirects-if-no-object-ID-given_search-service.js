import { ResultItem } from "./result-item.js";

export async function retrieveResultItem(searchParam) {
    const loading_text = `Searching for “${searchParam}”...`;
    var obj_Ids = [], uncached_objIds =[];
    var cached_parsed_Objs = [], parsed_Objs = [];
    let isEmpty = false;

    async function getAllArtworks(obj_Ids) {
        return await Promise.all(obj_Ids.map(async id => {
            let response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);}));
    }
    if (searchParam === null ) {

        isEmpty = true;
        const promise = await fetch("highlights.json");
        obj_Ids = (await promise.json())["highlights"];

    }

    for (let key of obj_Ids) {
        if (localStorage.getItem(key))  else {
            uncached_objIds.push(key);
        }
    }
    var rawData = await getAllArtworks(uncached_objIds).then();}
