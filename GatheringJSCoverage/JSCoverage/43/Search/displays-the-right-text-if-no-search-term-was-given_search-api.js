import { Artwork } from '/artwork.js';
import * as ArtworkCache from '/artwork-cache.js';
import { ArtworkDocumentContainer } from '/artwork-dom.js';

export ;

export 


export async function displayHighlights() {
	let artworks = [];

	const response = await fetch('/highlights.json');