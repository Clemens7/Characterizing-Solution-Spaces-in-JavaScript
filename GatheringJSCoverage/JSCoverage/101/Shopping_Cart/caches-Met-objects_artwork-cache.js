export 

export 

export 

export 


export function retrieveArtwork(objectID) {
  console.log(`Retrieving ${objectID} from local storage`);
  if (localStorage.getItem(objectID) !== null) {
    return JSON.parse(localStorage.getItem(objectID));
  }
}