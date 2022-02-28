export function retrieve(objectId) {
  if (objectId in localStorage) {
    console.log(`Retrieving ${objectId} from local storage`);
    return JSON.parse(localStorage[objectId]);
  }
}

export 
