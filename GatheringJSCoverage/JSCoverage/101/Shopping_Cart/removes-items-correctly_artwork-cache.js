export 

export function storeArtwork(artwork) {
  console.log(`store: ${JSON.stringify(artwork)}`);
  localStorage.setItem(artwork.objectID, JSON.stringify(artwork));
}

export 

export 


export function retrieveArtwork(objectID) {
  console.log(`Retrieving ${objectID} from local storage`);
  if (localStorage.getItem(objectID) !== null) {
    return JSON.parse(localStorage.getItem(objectID));
  }
}