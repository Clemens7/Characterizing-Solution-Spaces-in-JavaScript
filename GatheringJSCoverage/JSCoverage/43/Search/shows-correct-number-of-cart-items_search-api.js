import { Artwork } from '/artwork.js';
import * as ArtworkCache from '/artwork-cache.js';
import { ArtworkDocumentContainer } from '/artwork-dom.js';

export ;

export 


export async function displayHighlights() {
	let artworks = [];

	const response = await fetch('/highlights.json');
	const rawData = await response.json();
	let responseData = await rawData.highlights;

	const artworkContainer = new ArtworkDocumentContainer();
    artworkContainer.clear();

	for(let i = 0; i < responseData.length; ++i){
			
			artworks[i] = ArtworkCache.retrieve(responseData[i]);
			if(artworks[i]){				
				artworkContainer.addToDocument(artworks[i]);
				continue;
			}

		return artworks;
}