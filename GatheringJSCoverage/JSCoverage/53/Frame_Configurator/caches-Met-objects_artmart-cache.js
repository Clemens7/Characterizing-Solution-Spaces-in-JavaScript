import { Artmart, Searchterm} from './artmart.js';

export function retrieveObject(objectID) {
     if (objectID in localStorage) {
        console.log(`Retrieving ${objectID} from local storage`);
        return JSON.parse(localStorage[objectID]);
    }
}

export 