import { ArtObject } from './artObject.js'
import { retrieve, store } from './search-cache.js';

export 

export async function getArtworksbySearch(search){
    try{    
        let idList = retrieve(search);
        if(idList){
            return idList;
        };
        let objects = await getPromises(idList);} 


//TODO call API

