import { Picture } from './picture.js';
import * as DOM from './dom-helpers.js';

/**
 * Returns a new thumbnail DOM element from a given picture (used on search page)
 * @param {*} picture 
 */
export function createThumbnail(picture) {
    return DOM.setClassList(DOM.container([
        DOM.setAttributes(
            DOM.container([
                DOM.setAttributes(document.createElement('img'), {
                    src: picture.imageURLSmall, 
                    alt: 'Picture of ' + picture.title + ' by ' + picture.artist,
                    id: 'object-image-' + picture.objectID
                }),
                createLabel(picture)
            ], 'a'), {
            href: 'config.html?objectID=' + picture.objectID, 
            id: 'object-' + picture.objectID
        })
    ]), ['thumb']);
}

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