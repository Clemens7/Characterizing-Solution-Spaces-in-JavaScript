import {Picture} from './Picture.js';
import * as PictureCache from './PictureCache.js'
//parameter q is the string to search for
export 

//parameter objectID is the ID of a single object
export async function api_getObject(objectID) {
    let picture = PictureCache.retrieve(objectID);
    if(picture) {
        return picture;
    }}




