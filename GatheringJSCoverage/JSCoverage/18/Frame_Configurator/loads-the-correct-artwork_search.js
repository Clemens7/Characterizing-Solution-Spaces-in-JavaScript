/**
 * Class for search helper functions +  DOM functions
 */

/*
 * Returns ID
 * */
import {
    Painting
} from './picture.js';

export 


export async function getObjectsFromSearch(ObjectIDs) {

    try {
        let listOfImages = [];

        for (let id of ObjectIDs.slice(0, 100)) {
            const API_URL = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;
            const temp = await fetch(API_URL);
            const tempJson = await temp.json();
            const tempObject = new Painting(tempJson.objectID, tempJson.artistDisplayName, tempJson.title, tempJson.objectDate, tempJson.primaryImage, tempJson.primaryImageSmall);
            listOfImages.push(tempObject);
        }

        return listOfImages;
    }}


export 


export 
