import cartService from './services/cart_service.js';
import artCollectionService from "./services/art_collection_service.js";
import {calculatePrice, render} from './frame.js';

document.getElementById('checkout-button').onclick = ;

if (cartService.isEmpty)  else {
    document.getElementById('empty-text').style.display = 'none';
    const cartTemplate = document.getElementById('cart-template');

    let totalPrice = 0;

    Promise.all(cartService.cart.map(value => artCollectionService.fetchObject(value.objectID).then(content => Object.assign(value, content))))
        .then(value => value.forEach((value, index) => {
            const templateNode = cartTemplate.content.cloneNode(true);
            templateNode.querySelector('.cart-item').id = `cart-template-${index}`;

            const cartPreview = templateNode.querySelector('.cart-preview');
            cartPreview.id = `preview-container-${index}`;
            cartPreview.querySelector('a').href = `config.html?objectID=${value.objectID}&printSize=${value.printSize}&frameStyle=${value.frameStyle}&frameWidth=${value.frameWidth}&matColor=${value.matColor}&matWidth=${value.matWidth}`;

            const cartThumb = templateNode.querySelector('.cart-thumb');
            cartThumb.id = `preview-${index}`;
            cartThumb.src = value.primaryImageSmall;
            cartThumb.alt = value.title;
            cartThumb.onload = () => {
                render(cartThumb, cartPreview, value.printSize, value.frameStyle, value.frameWidth, value.matColor, value.matWidth);
            };

            templateNode.querySelector('.artist').innerText = value.artistDisplayName;
            templateNode.querySelector('.title').innerText = value.title;
            templateNode.querySelector('.date').innerText = value.objectDate;

            let size = {
                'S': 'Small',
                'M': 'Medium',
                'L': 'Large'
            };

            if (value.matWidth === 0)  else {
                templateNode.querySelector('.frame-description').innerText = `${size[value.printSize]} print in a ${value.frameWidth / 10} cm ${value.frameStyle} frame with a ${value.matWidth / 10} cm ${value.matColor} mat.`;
            }

            const price = calculatePrice(value.printSize, value.frameStyle, value.frameWidth, value.matWidth);
            const cartPrice = templateNode.querySelector('#price-0');
            cartPrice.id = `price-${index}`;
            cartPrice.innerText = price.toFixed(2);
            totalPrice += price;

            templateNode.querySelector('.cart-remove').onclick = () => {
                cartService.remove(value);
                document.getElementById(`cart-template-${index}`).style.display = 'none';
                totalPrice -= price;
                document.getElementById('price-total').innerText = totalPrice.toFixed(2);
                if (cartService.isEmpty) 
            };

            cartTemplate.parentNode.insertBefore(templateNode, cartTemplate); // insertAfter
        })).then(() => document.getElementById('price-total').innerText = totalPrice.toFixed(2));
}

const cartLinkCallback = (cart) => {
    const cartLink = document.getElementById('cart-link');
    if (cart.isEmpty)  else {
        cartLink.innerText = `Cart (${cart.length})`;
    }
};

cartService.addCallback(cartLinkCallback);
