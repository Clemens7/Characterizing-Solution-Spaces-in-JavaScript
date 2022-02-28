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
            if(responseArt === null){
                return 0;
            }}



function api_url(searchTerm){
    const API_URL = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${searchTerm}&hasImages=true`;
    return API_URL;
}