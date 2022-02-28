import {Art} from './search.js';
import * as ArtCache from './art-cache.js';
import {ArtDocumentContainer} from './art-dom.js'

var highlights;
const artContainer = new ArtDocumentContainer();

export async function retrieve(searchTerm){
    let arts = ArtCache.retrieve(searchTerm);
    if(arts)
   
    const url = api_url(searchTerm);
    try{
        if(searchTerm === '')else{
            
            const response = await fetch(url);
            const rawData = await response.json();
            const responseArt = await rawData.objectIDs;
            if(responseArt === null)
            console.log(responseArt);
            arts = await retrieveObjects(responseArt);
            console.log(arts);
        }
       
        ArtCache.store(searchTerm, arts);
        
        return arts.length;
    }}

async function retrieveObjects(objectIDs){
    let result = [];
    const frameURL = '/config.html?objectID=';
    objectIDs = objectIDs.slice(0,100);
    await Promise.all(objectIDs.map(objectID => fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`).then(r => r.json())
    .then(artObject => 
        {result.push(new Art(artObject.title,artObject.artistDisplayName,artObject.objectDate, artObject.primaryImageSmall, frameURL + artObject.objectID, artObject.objectID)); 
            artContainer.addArtToDocument(result[result.length - 1])})));
      return result;
}

function api_url(searchTerm){
    const API_URL = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${searchTerm}&hasImages=true`;
    return API_URL;
}