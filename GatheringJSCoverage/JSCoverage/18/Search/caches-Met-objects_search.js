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


export 


export 


export function updateSearchInfo(numberPictureTotal, pictureQuery) {
    if (numberPictureTotal == 1)  else {
        document.getElementById('search-info').innerText = `Found ${numberPictureTotal} artworks for “${pictureQuery}”`;
    }
}
