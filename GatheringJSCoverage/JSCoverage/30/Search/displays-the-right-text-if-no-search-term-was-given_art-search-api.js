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
        if(searchTerm === ''){
            await fetch('./highlights.json')
            .then(res => res.json())
            .then(data => {highlights = data;});
            arts = await retrieveObjects(highlights['highlights']);}

async function retrieveObjects(objectIDs){
    let result = [];
    const frameURL = '/config.html?objectID=';
    objectIDs = objectIDs.slice(0,100);
    await Promise.all(objectIDs.map(objectID => fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`).then(r => r.json())
    .then()));}

function api_url(searchTerm){
    const API_URL = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${searchTerm}&hasImages=true`;
    return API_URL;
}