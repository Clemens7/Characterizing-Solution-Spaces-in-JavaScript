import { Artwork } from '/artwork.js';
import * as ArtworkCache from '/artwork-cache.js';
import { ArtworkDocumentContainer } from '/artwork-dom.js';

export async function retrieve(q){

	const newQ = q.split(' ').join('+');
	let artworks = [];

	let searchInfo = document.getElementById('search-info');
	searchInfo.innerHTML = `Searching for “${q}”...`;

	const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${newQ}`;

	try {

		const response = await fetch(url);;
		searchInfo.innerHTML = 'Found ' + responseData.length + ' ' + infoText + ' for “' + q + '”';

		const artworkContainer = new ArtworkDocumentContainer();
      	artworkContainer.clear();

		for(let i = 0; i < responseData.length; ++i)};

export 


export 