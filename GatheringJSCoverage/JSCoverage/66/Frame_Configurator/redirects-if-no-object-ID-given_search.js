
//////////// +++ ARTWORK +++ ///////////////
export class Artwork {
    
}


/////////// +++ RETRIEVE +++ //////////////////
export 

async function retrieveObject(id) {

    const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;
    const response = await fetch(url);}

/////////// +++ DISPLAY +++ //////////////////

export 


/////////// +++ LOAD HIGHLIGHTS +++ //////////////////

export async function loadHighlights() {
console.log("load highlights");

    const response = await fetch("./highlights.json");         ////// get all the relevant IDs first
    const rawData = await response.json();
    const responseHighlights = await rawData.highlights;

    let highlights = [];

    for (let i = 0; i < responseHighlights.length; i++) {              /////////// then get the objects

        let artwork = await retrieveObject(responseHighlights[i]);}
