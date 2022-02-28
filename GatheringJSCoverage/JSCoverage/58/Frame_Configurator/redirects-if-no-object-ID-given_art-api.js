
import { Artwork } from './art-object.js';
import * as Cache from './art-cache.js';

const collectionapi = "https://collectionapi.metmuseum.org/public/collection/v1";

export 

export async function get_objects(objectIDs){
	let cache_result = Cache.retrieve(objectIDs);

	let promises = cache_result.misses.map(id => fetch(objects_api(id))
		.then());
	
	let results = await Promise.all(promises);}

export async function load_local(file){
	try{
		const response 	= await fetch(file);
		const json 		=  await response.json();
		return json;
	}}

function objects_api(id){
	return `${collectionapi}/objects/${id}`;
}





