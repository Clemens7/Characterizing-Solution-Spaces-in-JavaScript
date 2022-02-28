import { Artwork } from '../metmuseum/artwork-model.js';

export function retrieve(objectId) {
    if (objectId in localStorage) {
        return JSON.parse(localStorage[objectId]);
    }
}

export 