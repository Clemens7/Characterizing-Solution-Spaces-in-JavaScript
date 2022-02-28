// module to handle met API

import { MetObject } from './met.js';
import * as MetCache from './metCache.js';

const API_OBJ_URL = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";
const API_SEARCH_URL = "https://collectionapi.metmuseum.org/public/collection/v1/search?q=";

export async function retrieveObj(objectID) {
	let url = API_OBJ_URL + objectID;
	let obj = MetCache.retrieveObj(objectID);

	if (obj) {
		return obj;
	}

	try {
		const response = await fetch(url);
		console.log("got response");
		const rawData = await response.json();
		console.log("got json");
		obj = new MetObject(rawData.objectID, rawData.primaryImageSmall, rawData.title, rawData.artistDisplayName, rawData.objectDate);
		MetCache.storeObj(obj);
		return obj;
	}}

export 
