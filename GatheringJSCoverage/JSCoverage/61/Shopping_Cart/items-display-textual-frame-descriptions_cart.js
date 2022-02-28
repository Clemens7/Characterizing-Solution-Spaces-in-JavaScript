import {fetchArtwork} from './common.js';
import {render} from './frame.js';
import {calculatePrice} from './frame.js';

function showItems() {
    items = 0;
    priceTotal = 0;
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (!Array.isArray(cart) || cart.length === 0)  else {
        let index = 0;
        cart.forEach(async item => {
            await fetchArtwork(item.objectID, data => {
                const source = data.primaryImageSmall;
                const artist = data.artistDisplayName;
                const title = data.title;
                const date = data.objectDate;
                const frameDescription = generateFrameDescription(item.printSize, item.frameStyle, item.frameWidth, item.matColor, item.matWidth);
                const price = calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
                priceTotal += price;
                document.getElementById('cart').insertAdjacentHTML('afterbegin', `
                  <div class="cart-item" id="item-${index}">
                    <div class="cart-preview" id="preview-container-${index}">
                      <a href="config.html?objectID=${item.objectID}&printSize=${item.printSize}&frameStyle=${item.frameStyle}&frameWidth=${item.frameWidth}&matColor=${item.matColor}&matWidth=${item.matWidth}">
                        <img class="cart-thumb" src="${source}" id="preview-${index}" alt="${title}">
                      </a>
                    </div>
                    <div class="museum-label">
                      <div>
                        <span class="artist">${artist}</span>
                        <span class="title">${title}</span>,
                        <span class="date">${date}</span>
                        <br><br>
                        <span class="frame-description">${frameDescription}</span>
                      </div>
                      <div class="cart-price">€ <span id="price-${index}">${price.toFixed(2)}</span></div>
                      <button class="cart-remove" id="remove-${index}" type="button"></button>
                    </div>
                  </div>
                `);
                let help = index;
                document.getElementById('preview-' + index).addEventListener('load', () => render(document.getElementById('preview-' + help), document.getElementById('preview-container-' + help), item.printSize, item.frameStyle, item.frameWidth, item.matColor, item.matWidth));
                document.getElementById('remove-' + index).addEventListener('click', );
                index++;
                if (index === cart.length) {
                    items = index;
                    document.getElementById('cart-link').innerHTML = 'Cart (' + items + ')';
                    document.getElementById('price-total').innerHTML = priceTotal.toFixed(2);
                }
            });
        });
    }
}

function generateFrameDescription(printSize, frameStyle, frameWidth, matColor, matWidth) {
    switch (printSize) {
        case 'S':
            printSize = 'Small';
            break;
        
        case 'L':
            printSize = 'Large';
            break;
    }
    return printSize + ' print in a ' + frameWidth / 10 + ' cm ' + frameStyle + ' frame' + (matWidth === 0 ? '.' : ' with a ' + matWidth / 10 + ' cm ' + matColor + ' mat.');
}



let items;
let priceTotal;
showItems();
document.getElementById('checkout-button').addEventListener('click', );
