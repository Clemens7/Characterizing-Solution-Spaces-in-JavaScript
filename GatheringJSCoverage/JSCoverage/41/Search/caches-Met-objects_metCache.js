// module to cache met API responses

import { MetObject } from './met.js';

export function retrieveObj(objectID) {
    if(objectID in localStorage) {
        console.log(`Retrieving met object with ID ${objectID} from local storage`);
        return JSON.parse(localStorage[objectID]);
    }
}

export 