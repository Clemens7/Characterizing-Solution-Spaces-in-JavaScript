
//////////// +++ ARTWORK +++ ///////////////
export class Artwork {
    
}


/////////// +++ RETRIEVE +++ //////////////////
export async function retrieve(q) {

    if (q in localStorage) 
    let artworks = [];
    let objectCount = 100;


    const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${q}`;


    try {
        const response = await fetch(url);            /////// get all the relevant IDs first
        const rawData = await response.json();
        const responseArtworkIDs = await rawData.objectIDs;
        console.log(responseArtworkIDs);

        if(responseArtworkIDs.length < 100) catch(error) {
        console.log(`An error happened when trying to retrieving data from URL ${url}`);
        console.log(error);
    }}



/////////// +++ DISPLAY +++ //////////////////

export 


/////////// +++ LOAD HIGHLIGHTS +++ //////////////////

export 
