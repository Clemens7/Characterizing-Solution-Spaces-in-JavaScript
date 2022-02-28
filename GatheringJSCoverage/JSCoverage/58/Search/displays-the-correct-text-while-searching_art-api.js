
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

	let promises = cache_result.misses.map(id => fetch(objects_api(id))
		.then(response => response.json()));
	
	let results = await Promise.all(promises);

	let new_objects = results.map(
            art => new Artwork(art.objectID, art.artistDisplayName, art.title,art.objectDate,art.primaryImageSmall));

	Cache.store(new_objects);

	return cache_result.hits.concat(new_objects);
}

export 

function objects_api(id){
	return `${collectionapi}/objects/${id}`;
}

function search_api(searchTerm){
    return `${collectionapi}/search?q=${searchTerm}&hasImages=true`;
}



