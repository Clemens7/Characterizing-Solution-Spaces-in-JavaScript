import { ArtObject } from './artObject.js'
import { retrieve, store } from './search-cache.js';

export 

export async function getArtworksbySearch(search){
    try{    
        let idList = retrieve(search);
        if(idList)
        const resp = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${search}&hasImages=true`);;
        let objects = await getPromises(idList);} 


//TODO call API

