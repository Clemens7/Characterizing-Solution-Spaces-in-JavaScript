import { requestObjectInfo } from './request.js';
import { render, calculatePrice } from './frame.js';

import * as cart from './cartStore.js';

let cartObjects;
let renderQue;
window.onload = function () {
    cartObjects = cart.get();
    renderQue = renderAllObjects(cartObjects);
    renderQue.then(() => {
        updatePageValues();
    });
};
//generate textual frame desription
function createFrameDescription(
    printSize,
    frameWidth,
    frameStyle,
    matWidth,
    matColor
) {
    let frameDescr = '';
    switch (printSize) {
        case 'S':
            frameDescr = 'Small';
            break;
        case 'M':
            frameDescr = 'Medium';
            break;
        case 'L':
            frameDescr = 'Large';
            break;
    }
    frameDescr += ` print in a ${frameWidth / 10} cm ${frameStyle} frame`;
    if (matWidth != 0) {
        frameDescr += ` with a ${matWidth / 10} cm ${matColor} mat`;
    }
    frameDescr += `.`;
    return frameDescr;
}

//update function parameter
function updatePageValues() {
    cart.displayNumItems();
    displayTotalprice();
    emptyCartActions();
}

//calculate totalprice
function displayTotalprice() {
    const price = [];
    document.querySelectorAll('.cart-price span').forEach((e) => {
        price.push(parseFloat(e.innerText) );
    });
    const sum = price.reduce((p, c) => {
        return (p += c);
    }, 0);
    document.getElementById('price-total').innerText = sum; //todo: sum
}

//emptyCartActionss
function emptyCartActions() {
    if (cartObjects.length === 0) 
}

//adds an artwork and its frameconfigurations to an Array cartObjects as an JSON object
//which is then saved in the localStorage under the key 'cart'
function uuid() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
//renders all artworks in that are currently saved in the localStorage under the key 'cart'
function renderAllObjects() {
    const items = cartObjects.map((element) => {
        const id = uuid();
        const _el = createCartItem(id, element);
        //insert frame Description
        document.getElementById(
            `frame-description-${id}`
        ).innerText = createFrameDescription(
            element.printSize,
            element.frameWidth,
            element.frameStyle,
            element.matWidth,
            element.matColor
        );
        //insert href linking to config.html
        document
            .getElementById(`preview-container-${id}`)
            .querySelector('a').href = hrefFrameConig(
            element.objectID,
            element.printSize,
            element.frameStyle,
            element.frameWidth,
            element.matWidth,
            element.matColor
        );
        return new Promise((res, rej) => {
            requestObjectInfo(element.objectID)
                .then((reqObjc) => {
                    _el.price.innerText = `${calculatePrice(
                        element.printSize,
                        element.frameStyle,
                        element.frameWidth,
                        element.matWidth
                    )}`;
                    _el.date.innerText = `, ${reqObjc.objectDate}`;
                    _el.img.src = reqObjc.primaryImageSmall;
                    _el.title.innerText = reqObjc.title;
                    _el.img.alt = reqObjc.title;
                    _el.artist.innerText = reqObjc.artistDisplayName;

                    render(
                        document.getElementById(`preview-${id}`),
                        document.getElementById(`preview-container-${id}`),
                        element.printSize,
                        element.frameStyle,
                        element.frameWidth,
                        element.matColor,
                        element.matWidth
                    );

                    res({ id, ...element });
                })
                .catch();
        });
    });
    return Promise.all(items);
}

//deletes item from cart


//
function hrefFrameConig(
    objectID,
    printSize,
    frameStyle,
    frameWidth,
    matWidth,
    matColor
) {
    return `./config.html?objectID=${objectID}&printSize=${printSize}&frameStyle=${frameStyle}&frameWidth=${frameWidth}&matColor=${matColor}&matWidth=${matWidth}`;
}
//create DOM for artwork Preview in cart
function createCartItem(id, element) {
    const _el = {};
    const wapper = document.createElement('div');
    wapper.className = 'cart-item';

    //preview
    const cartPreview = document.createElement('div');
    cartPreview.className = 'cart-preview';
    cartPreview.id = `preview-container-${id}`;
    wapper.appendChild(cartPreview);

    const link = document.createElement('a');
    link.href = '';
    const img = document.createElement('img');
    img.className = 'cart-thumb';
    img.id = `preview-${id}`;
    _el.img = img;

    link.appendChild(img);
    cartPreview.appendChild(link);

    //label
    const label = document.createElement('div');
    label.className = 'museum-label';
    const divLa = document.createElement('div');
    const artist = document.createElement('span');
    artist.className = 'artist';
    _el.artist = artist;
    const title = document.createElement('span');
    title.className = 'title';
    _el.title = title;
    const date = document.createElement('span');
    date.className = 'date';
    _el.date = date;
    divLa.appendChild(artist);
    divLa.appendChild(title);
    divLa.appendChild(date);
    divLa.appendChild(document.createElement('br'));
    divLa.appendChild(document.createElement('br'));
    const frameDescr = document.createElement('span');
    frameDescr.className = 'frame-description';
    frameDescr.id = `frame-description-${id}`;
    divLa.appendChild(frameDescr);
    label.appendChild(divLa);

    wapper.appendChild(label);

    //price
    const cartPrice = document.createElement('div');
    cartPrice.className = 'cart-price';
    cartPrice.innerHTML = '&euro; ';
    const priceShow = document.createElement('span');
    cartPrice.appendChild(priceShow);

    priceShow.id = `price-${id}`;
    _el.price = priceShow;

    const button = document.createElement('button');
    button.className = 'cart-remove';
    button.id = id;
    button.addEventListener('click', );
    cartPrice.appendChild(button);

    label.appendChild(cartPrice);
    document
        .getElementById('cart')
        .insertBefore(wapper, document.getElementById('cart').firstChild);
    return _el;
}
