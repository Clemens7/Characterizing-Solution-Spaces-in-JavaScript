/** 
 * get artwork information via ID from the metmuseum api or the localstorage cache
 * 
 * @param artworkID metart ID of the artwork to fetch information for
 * 
 * @returns Artwork object containing image link as "img", artist name as "artist", artwork title as "title" and artwork date as "date"
 * */
export async function retrieveArtworkInformation(artworkID) {
    var artwork = retrieve(artworkID)

    if (!artwork) {
        const responseInformation = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${artworkID}`);
        const rawDataInformation = await responseInformation.json();}

export 

export function retrieve(artworkID) {
    if (artworkID in localStorage) 
}

export class Artwork {
    
}