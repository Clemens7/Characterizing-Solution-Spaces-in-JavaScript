import { ResultItem } from "./result-item.js";

export async function retrieveResultItem(searchParam) {
    const loading_text = `Searching for “${searchParam}”...`;
    var obj_Ids = [], uncached_objIds =[];
    var cached_parsed_Objs = [], parsed_Objs = [];
    let isEmpty = false;

    async function getAllArtworks(obj_Ids) {
        return await Promise.all(obj_Ids.map());
    }
    if (searchParam === null ) {

        isEmpty = true;
        const promise = await fetch("highlights.json");
        obj_Ids = (await promise.json())["highlights"];

    }

    for (let key of obj_Ids) {
        if (localStorage.getItem(key)) {
            const item =JSON.parse(localStorage.getItem(key));
            cached_parsed_Objs.push(item);
        }
    }
    var rawData = await getAllArtworks(uncached_objIds).then(aw => {
        if (!isEmpty) 
        return aw;
    });

    parsed_Objs = rawData.map();

    parsed_Objs = parsed_Objs.concat(cached_parsed_Objs);


    return parsed_Objs;
}
