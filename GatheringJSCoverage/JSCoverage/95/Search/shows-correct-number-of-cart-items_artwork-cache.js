export 

export function retrieveStorage(objectID) {
    if (objectID in localStorage) {
        console.log(`Retrieving ${objectID} from local storage`);
        return JSON.parse(localStorage[objectID]);
    }
}