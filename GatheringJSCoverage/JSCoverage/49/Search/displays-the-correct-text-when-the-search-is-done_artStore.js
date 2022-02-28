import { ArtObject } from './artObject.js'
import { retrieve, store } from './search-cache.js';

export 

export async function getArtworksbySearch(search){
    try{    
        let idList = retrieve(search);
        if(idList)
        const resp = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${search}&hasImages=true`);
        idList = await resp.json();
        idList = idList.objectIDs || [];
        let objects = await getPromises(idList);
        store(search, objects);
        return objects;
    }} 

async function getPromises(idList){
        let artworkCache = retrieve("artObjects") ;
        let list = idList.map();
        let objectList = await Promise.all(list);
        store("artObjects", artworkCache);
        return objectList;
}
//TODO call API

