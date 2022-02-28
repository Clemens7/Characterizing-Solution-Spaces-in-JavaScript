import { Picture } from './picture.js';
import * as DOM from './dom-helpers.js';

/**
 * Returns a new thumbnail DOM element from a given picture (used on search page)
 * @param {*} picture 
 */
export 

/**
 * Returns a new label for a given picture
 * @param {*} picture 
 */
export function createLabel(picture) {
    return DOM.setClassList(
        DOM.container([
            DOM.setClassList(DOM.innerTextElement(picture.artist, 'span'), ['artist']),
            DOM.setClassList(DOM.innerTextElement(picture.title + ', ', 'span'), ['title']),
            DOM.setClassList(DOM.innerTextElement(picture.date, 'span'), ['date']),
        ]), ['museum-label']
    );
}