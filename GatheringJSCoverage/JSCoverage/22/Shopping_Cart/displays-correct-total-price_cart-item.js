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
    this.createContainer = function (cartObject, artInfo, objectPrice) {

        let cartItem = createElement('div', 'cart-item');

        cartItem.appendChild(cartPreview(cartObject, cartObject.cartID, artInfo));
        cartItem.appendChild(museumLabel(cartObject, artInfo, cartObject.cartID, objectPrice));

        container.prepend(cartItem);
    };

    /**
     * @param {{objectID, printSize, frameWidth, frameStyle, matWidth, matColor, cartID}} object
     * @param {number} id
     * @param {{date, image, artist, id, title}} art
     * @return {Element}
     */
    let cartPreview = function (object, id, art) {
        let cartPreview = createElement('div', 'cart-preview', `preview-container-${id}`);

        let a = createElement('a');
        a.href = `config.html?objectID=${object.objectID}&printSize=${object.printSize}&frameStyle=${object.frameStyle}` +
                `&frameWidth=${object.frameWidth}&matColor=${object.matColor}&matWidth=${object.matWidth}`;

        let cartThumb = createElement('img', "cart-thumb", `preview-${id}`);
        cartThumb.src = art.image;
        cartThumb.onload = function () {
            render(cartThumb, cartPreview, object.printSize, object.frameStyle, object.frameWidth, object.matColor, object.matWidth);
        };

        cartPreview.appendChild(a);
        a.appendChild(cartThumb);

        return cartPreview;
    };

    /**
     * @param {{objectID, printSize, frameWidth, frameStyle, matWidth, matColor, cartID}} object
     * @param {{date, image, artist, id, title}} art
     * @param {number} id
     * @param {number} price
     * @return {Element}
     */
    let museumLabel = function (object, art, id, price) {
        let museumLabel = createElement('div', 'museum-label');

        museumLabel.appendChild(artDiv(art, object));
        museumLabel.appendChild(itemPrice(id, price));
        museumLabel.appendChild(removeButton(id));

        return museumLabel;
    };

    /**
     *
     * @param {{date, image, artist, id, title}} art
     * @param {{objectID, printSize, frameWidth, frameStyle, matWidth, matColor, cartID}} object
     * @return {Element}
     */
    let artDiv = function (art, object) {
        let div = createElement('div');

        let artist = createElement('span', 'artist');
        artist.textContent = art.artist;
        let title = createElement('span', 'title');
        title.textContent = art.title;
        title.append(', ');
        let date = createElement('span', 'date');
        date.textContent = art.date;
        let frameDescription = createElement('span', 'frame-description');
        frameDescription.textContent = makeFrameDescription(object);

        div.appendChild(artist);
        div.appendChild(title);
        div.appendChild(date);
        div.appendChild(br());
        div.appendChild(br());
        div.appendChild(frameDescription);

        return div;
    };

    /**
     *
     * @param {number} id
     * @param {number} price
     * @return {Element}
     */
    let itemPrice = function (id, price) {
        let cartPrice = createElement('div', 'cart-price');
        let euro = document.createTextNode('€ ');
        let priceTag = createElement('span', undefined, `price-${id}`);
        priceTag.textContent = price.toFixed(2);

        cartPrice.appendChild(euro);
        cartPrice.appendChild(priceTag);

        return cartPrice;
    };

    /**
     * @param {number} id
     * @return {Element}
     */
    let removeButton = function (id) {
        let cartRemove = createElement('button', 'cart-remove');
        cartRemove.onclick = ;

        return cartRemove;
    };

    /**
     * @return {Element}
     */
    let br = function () {
        return createElement('br');
    };

    /**
     * @param {string} tag
     * @param {string} [className]
     * @param {string} [id]
     * @returns {Element} element
     */
    let createElement = function (tag, className, id) {
        let element = document.createElement(tag);
        if (className) {
            element.className = className;
        }
        if (id) {
            element.id = id;
        }
        return element;
    };

    /**
     *
     * @param {{objectID, printSize, frameWidth, frameStyle, matWidth, matColor}} object
     * @returns {string}
     */
    let makeFrameDescription = function (object) {
        const print = `${printSize(object.printSize)} print `;
        const frame = `in a ${object.frameWidth / 10} cm ${object.frameStyle} frame`;
        const mat = (object.matWidth > 0) ? ` with a ${object.matWidth / 10} cm ${object.matColor} mat` ;

        return `${print}${frame}${mat}.`;
    };

    /**
     * @param {string} size the print-size (short)
     * @returns {string} long string for the print-size
     */
    let printSize = function (size) {
        switch (size) {
            case 'S':
                return 'Small';
            
            case 'L':
                return 'Large';
        }
    };

    /**
     * Writes the message 'There are no items in your shopping cart.' on the screen.
     * @returns {void}
     */
    this.emptyCartMessage = 
}