import { Artwork } from '/artwork.js';
import * as ArtworkCache from '/artwork-cache.js';
import { ArtworkDocumentContainer } from '/artwork-dom.js';

export ;

export async function retrieveArt(objectID){
	const objURL = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`;
	const objResponse = await fetch(objURL);
	const objRawData = await objResponse.json();
	let artwork = new Artwork(objRawData.artistDisplayName, objRawData.title, objRawData.objectID, 
				objRawData.primaryImageSmall, objRawData.objectName, objRawData.objectDate);
	return artwork;
}


export 