import * as DOM from './domHelper.js'
import {calculatePrice, render} from "./frame.js";
import {getOneArtworkByID} from "./searchService.js";
import {Artwork} from "./artwork.js";
import {displayCartCount} from "./main.js";


const cart = "cart";

document.addEventListener("DOMContentLoaded", () => {
    let items = JSON.parse(window.localStorage.getItem(cart));

    let sCart = document.getElementById(cart);
    // pageLoad(items, sCart).then(() => {
    //     if (items == null) {
    //         sCart.appendChild(createCheckoutBtnDom(true, items));
    //     } else {
    //         sCart.appendChild(createCheckoutBtnDom(false, items))
    //     }
    // });
    pageLoad(items, sCart);
    displayCartCount();
});

async function pageLoad(items, sCart) {

    if (items == null) else if(items.length === 0)
    else{
        for (let i in items) {
            await getOneArtworkByID(items[i].objectID).then(result => {

                let artwork = new Artwork(
                    result.objectID,
                    result.artistDisplayName,
                    result.title,
                    result.objectDate,
                    result.primaryImageSmall);

                sCart.appendChild(createdArtDom(artwork, items[i], i));
                // let img = document.getElementById('preview-' + artwork.id);
                // let container = document.getElementById('preview-container-' + artwork.id);
                let img = document.getElementById('preview-' + i);
                let container = document.getElementById('preview-container-' + i);
                render(img, container, items[i].printSize, items[i].frameStyle, items[i].frameWidth, items[i].matColor, items[i].matWidth);
            });

        }
        sCart.appendChild(createCheckoutBtnDom(false, items));
    }
}

function createdArtDom(artwork, item, index) {
    // return DOM.container([
    //     DOM.containerWithID([
    //         DOM.linkContainerNoID([
    //             DOM.imgWithClass(artwork.thumbnail, '', 'preview-' + artwork.id, 'cart-thumb')
    //         ], 'config.html?objectID='+artwork.id+'&printSize='+item.printSize+'&frameStyle='+item.frameStyle+'&frameWidth='+(item.frameWidth)+'&matWidth='+(item.matWidth)+'&matColor='+item.matColor + '&index=' + index)
    //     ], 'div', 'cart-preview', 'preview-container-' + artwork.id),
    //     DOM.container([
    //         DOM.containerNoClass([
    //             DOM.textElement(artwork.artist, 'span', 'artist'),
    //             DOM.textElement(artwork.title + ', ', 'span', 'title'),
    //             DOM.textElement(artwork.date, 'span', 'date'),
    //             document.createElement('BR'),
    //             DOM.frameDescription(item.printSize, item.frameStyle, item.frameWidth, item.matColor, item.matWidth,'span','frame-description')
    //         ], 'div'),
    //         DOM.containerNoClass([
    //             DOM.textElementWithoutclass(getIndividualSum(item).toFixed(2), 'span', 'price-' + artwork.id)
    //         ], 'div'),
    //         DOM.btn('button', 'cart-remove',artwork.id)
    //     ], 'div', 'museum-label')
    // ], 'div', 'cart-item')
    return DOM.container([
        DOM.containerWithID([
            DOM.linkContainerNoID([
                DOM.imgWithClass(artwork.thumbnail, '', 'preview-' + index, 'cart-thumb')
            ], 'config.html?objectID='+artwork.id+'&printSize='+item.printSize+'&frameStyle='+item.frameStyle+'&frameWidth='+(item.frameWidth)+'&matWidth='+(item.matWidth)+'&matColor='+item.matColor + '&index=' + index)
        ], 'div', 'cart-preview', 'preview-container-' + index),
        DOM.container([
            DOM.containerNoClass([
                DOM.textElement(artwork.artist, 'span', 'artist'),
                DOM.textElement(artwork.title + ', ', 'span', 'title'),
                DOM.textElement(artwork.date, 'span', 'date'),
                document.createElement('BR'),
                DOM.frameDescription(item.printSize, item.frameStyle, item.frameWidth, item.matColor, item.matWidth,'span','frame-description')
            ], 'div'),
            DOM.containerNoClass([
                DOM.textElementWithoutclass(getIndividualSum(item).toFixed(2), 'span', 'price-' + artwork.id)
            ], 'div'),
            DOM.btn('button', 'cart-remove',artwork.id, index)
        ], 'div', 'museum-label')
    ], 'div', 'cart-item')
}

function createCheckoutBtnDom(state, items) {
    if (state)  else {
        return DOM.container([
            DOM.container([
                DOM.textElementWithoutclass(getTotalSum(items).toFixed(2), 'span', 'price-total')
            ], 'div', 'price'),
            DOM.btnCheckout('button', 'button', 'checkout-button', state)
        ], 'div', 'cart-total')
    }
}

function getTotalSum(items) {
    //console.log(items);
    let sum=0;
    for (let i in items) {
        if (items.hasOwnProperty(i)) {
            //console.log(items[i].frameWidth);
            sum += calculatePrice(items[i].printSize, items[i].frameStyle, items[i].frameWidth, items[i].matWidth);
        }
    }
    return sum;
}

function getIndividualSum(item) {
    let sum=0;
    sum+=calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
    return sum;
}

