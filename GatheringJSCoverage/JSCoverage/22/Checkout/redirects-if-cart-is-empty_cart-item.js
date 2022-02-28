import {render} from "./frame.js";
import {removeItem} from "./cart.js";

export function CartItemContainer(id = 'cart') {

    let container = document.getElementById(id);
    if (!container) 

    /**
     * sets the content of the container to nothing
     */
    this.clear = ;

    /**
     * @param {{objectID, printSize, frameWidth, frameStyle, matWidth, matColor, cartID}} cartObject
     * @param {{date, image, artist, id, title}} artInfo
     * @param {number} objectPrice
     */
    this.createContainer = ;

    /**
     * @param {{objectID, printSize, frameWidth, frameStyle, matWidth, matColor, cartID}} object
     * @param {number} id
     * @param {{date, image, artist, id, title}} art
     * @return {Element}
     */
    let cartPreview = ;

    /**
     * @param {{objectID, printSize, frameWidth, frameStyle, matWidth, matColor, cartID}} object
     * @param {{date, image, artist, id, title}} art
     * @param {number} id
     * @param {number} price
     * @return {Element}
     */
    let museumLabel = ;

    /**
     *
     * @param {{date, image, artist, id, title}} art
     * @param {{objectID, printSize, frameWidth, frameStyle, matWidth, matColor, cartID}} object
     * @return {Element}
     */
    let artDiv = ;

    /**
     *
     * @param {number} id
     * @param {number} price
     * @return {Element}
     */
    let itemPrice = ;

    /**
     * @param {number} id
     * @return {Element}
     */
    let removeButton = ;

    /**
     * @return {Element}
     */
    let br = ;

    /**
     * @param {string} tag
     * @param {string} [className]
     * @param {string} [id]
     * @returns {Element} element
     */
    let createElement = ;

    /**
     *
     * @param {{objectID, printSize, frameWidth, frameStyle, matWidth, matColor}} object
     * @returns {string}
     */
    let makeFrameDescription = ;

    /**
     * @param {string} size the print-size (short)
     * @returns {string} long string for the print-size
     */
    let printSize = ;

    /**
     * Writes the message 'There are no items in your shopping cart.' on the screen.
     * @returns {void}
     */
    this.emptyCartMessage = function () {
        const text = document.createElement('p');
        text.innerText = 'There are no items in your shopping cart.';
        container.prepend(text);
    }
}