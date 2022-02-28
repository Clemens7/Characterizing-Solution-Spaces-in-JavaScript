// module to handle met API

import { MetObject } from './met.js';
import * as MetCache from './metCache.js';

const API_OBJ_URL = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";
const API_SEARCH_URL = "https://collectionapi.metmuseum.org/public/collection/v1/search?q=";

export 

export async function search(query) {
	// const url = `${API_SEARCH_URL}${query}&hasImage=true`;
	const url = API_SEARCH_URL + query + "&hasImages=true";
	try {
		const response = await fetch(url);}
