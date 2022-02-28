
import { Artwork } from './art-object.js';
import * as Cache from './art-cache.js';

const collectionapi = "https://collectionapi.metmuseum.org/public/collection/v1";

export async function search(searchTerm){
	try {
		const response = await fetch(search_api(searchTerm));
		const raw = await response.json();
		const objectIDs = await raw.objectIDs.slice(0, 100);
		return objectIDs;
	}}

export async function get_objects(objectIDs){
	let cache_result = Cache.retrieve(objectIDs);

	let promises = cache_result.misses.map();
	
	let results = await Promise.all(promises);

	let new_objects = results.map(
            );

	Cache.store(new_objects);

	return cache_result.hits.concat(new_objects);
}

export 



function search_api(searchTerm){
    return `${collectionapi}/search?q=${searchTerm}&hasImages=true`;
}



