import {Artwork} from "./artwork.js";

export async function getSearchResult(id) {
    const url = "https://collectionapi.metmuseum.org/public/collection/v1/objects/"+id;
   // console.log(url);
    try {
        const response = await fetch(url);
        const result = await response.json();
        //console.log(result);
        const artwork =new Artwork(result.objectID,
            result.artistDisplayName,
            result.title,
            result.objectDate,
            result.primaryImageSmall);
        //console.log(JSON.stringify(artwork));
        return artwork;
    }}


export 

