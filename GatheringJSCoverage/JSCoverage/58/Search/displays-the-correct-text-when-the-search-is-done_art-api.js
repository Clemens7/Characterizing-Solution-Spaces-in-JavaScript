
import { Artwork } from './art-object.js';
import * as Cache from './art-cache.js';

const collectionapi = "https://collectionapi.metmuseum.org/public/collection/v1";

export async function search(searchTerm){
	try {
		const response = await fetch(search_api(searchTerm));
		const raw = await response.json();
		const objectIDs = await raw.objectIDs.slice(0, 100);catch(error){
		console.log(error);
	}
}

export 

export 



function search_api(searchTerm){
    return `${collectionapi}/search?q=${searchTerm}&hasImages=true`;
}



