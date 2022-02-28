import { Artwork } from '../metmuseum/artwork-model.js';

export function retrieve(objectId) {
    if (objectId in localStorage) {
        return JSON.parse(localStorage[objectId]);
    }
}

export function store(objectId, artwork) {
    localStorage[objectId] = JSON.stringify(artwork);
}