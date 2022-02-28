import {Artwork} from "./artwork.js";

export 


export async function getArtworks(searchTerm){
    const url = "https://collectionapi.metmuseum.org/public/collection/v1/search?q="+searchTerm+"&hasImages=true";
   // console.log(url);
    try{
        const response = await fetch(url);
        const result = await response.json();
        const resultArr = await result.objectIDs;
    //    console.log(resultArr);
        return resultArr;
    }}

