import * as ArtworkCache from './search-cache.js'

export class Artwork {
    
}

export async function retrieveArtwork(searchTerm) {
    //console.log(searchTerm);



    console.log(1);
    const response = fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${searchTerm}`);
    return response
        .then()
        .then()
        .then()
    /*
    console.log(2);
    const rawData = await response.json();
    console.log(3);
    let results = await rawData.objectIDs;
    console.log(4);
    let length = results.length;
    results = results.splice(0,100);
    //console.log(results);
    //const artworks = createArtworksArray(results);
    const foundText = document.getElementById('search-info');
    foundText.innerHTML = `Found ${length} artworks  for “${searchTerm}”`;
    //console.log(artworks[1]);
    return results;
    */
}



export 


export class ArtworkDocumentContainer {
    

    

    
}