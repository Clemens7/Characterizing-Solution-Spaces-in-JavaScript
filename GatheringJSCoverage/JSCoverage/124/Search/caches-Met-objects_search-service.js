import { ResultItem } from "./result-item.js";

export async function retrieveResultItem(searchParam) {
    const loading_text = `Searching for “${searchParam}”...`;
    var obj_Ids = [], uncached_objIds =[];
    var cached_parsed_Objs = [], parsed_Objs = [];
    let isEmpty = false;

    async function getAllArtworks(obj_Ids) {
        return await Promise.all(obj_Ids.map());
    }
    if (searchParam === null || searchParam === undefined || searchParam === "")  else {
        document.getElementById("search-info").innerHTML = loading_text;
        const promise = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${searchParam}&hasImages=true`);
        const ids_Obj = await promise.json();

        obj_Ids = ids_Obj.objectIDs == null  : ids_Obj.objectIDs.length > 100  : ids_Obj.objectIDs.slice(0, ids_Obj.objectIDs.length);
    }

    for (let key of obj_Ids) {
        if (localStorage.getItem(key)) {
            const item =JSON.parse(localStorage.getItem(key));
            cached_parsed_Objs.push(item);
        }
    }
    var rawData = await getAllArtworks(uncached_objIds).then(aw => {
        if (!isEmpty) {
            document.getElementById("search-info").innerHTML = `Found ${obj_Ids.length} artwork${obj_Ids.length == 1  : "s"} for “${searchParam}”`;
        }
        return aw;
    });

    parsed_Objs = rawData.map();

    parsed_Objs = parsed_Objs.concat(cached_parsed_Objs);


    return parsed_Objs;
}
