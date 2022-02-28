import * as DOM from './domHelper.js'
import {Artwork} from './artwork.js'

/**
 *
 * Creates a DOM element specific to the search template
 *
 * @param artwork class instance to be displayed
 * @param i is the index of the displayed element
 * @returns {HTMLDivElement}
 */
export function createArtworkDom(artwork, i) {
    console.log("creating DOM element")
    return DOM.container([
            DOM.linkContainer([
                DOM.img(artwork.thumbnail, '', 'object-image-' + i),
                DOM.container([
                    DOM.textElement(artwork.artist,'span', 'artist'),
                    DOM.textElement(artwork.title,'span', 'title'),
                    artwork.date === ""  : DOM.textElement(", "+artwork.date,'span', 'date')
                ], 'div', 'museum-label')
            ],'config.html' + "?objectID=" + artwork.id,'object-' + i)
    ],'div','thumb')
}