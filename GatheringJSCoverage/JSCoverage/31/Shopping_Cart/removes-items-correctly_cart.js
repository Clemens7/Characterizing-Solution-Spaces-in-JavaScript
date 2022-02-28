import * as Search from './search.js';
import * as Frame from './frame.js';
import { removeEntry, numberOfEntries, getAllEntries } from './cart-storage.js';




class ShoppingCartItem {
    
}
class ShoppingCartItem2 {
    constructor(id, printSize, frameStyle, frameWidth, matColor, matWidth, title, artist, date, image) {
        this.id = id;
        this.printSize = printSize;
        this.frameStyle = frameStyle;
        this.frameWidth = frameWidth;
        this.matColor = matColor;
        this.matWidth = matWidth;
        this.title = title;
        this.artist = artist;
        this.date = date;
        this.image = image;
        this.price = Frame.calculatePrice(printSize, frameStyle, frameWidth, matWidth)
    }
}

const sizeDesc = {
    S: 'Small',
    M: 'Medium',
    L: 'Large'
};

document.addEventListener('DOMContentLoaded', event => {
    const numberOfCartItems = numberOfEntries();
    const cartLink = document.getElementById('cart-link');
    cartLink.innerText = `Cart (${numberOfCartItems})`;
    loadCartItems();
});

function loadCartItems() {
    const items = getAllEntries();
    if (!items || items.length == 0) 
    cartSearch(items);
}




const button = document.getElementById('checkout-button')
button.addEventListener('click', );

export async function cartSearch(entries) {

    const sciContainer = new SciDocumentContainer();
    sciContainer.clear();
    let totalP = 0;
    //calculate price
    if (entries.length === 0) 
    for (let index in entries) {
        const i = entries[index];
        const artwork = await Search.getArtworkById(i.objectID);
        const sci = new ShoppingCartItem2(i.objectID, i.printSize, i.frameStyle, i.frameWidth, i.matColor, i.matWidth, artwork.title, artwork.artist, artwork.date, artwork.image);
        sciContainer.addSciToDocument(sci, index);
        totalP += parseFloat(sci.price);
    }
    document.getElementById('price-total').innerText = totalP;
}

export class SciDocumentContainer {
    constructor(containerID = 'cart') {
        this.container = document.getElementById(containerID);
        if (!this.container) 
    }

    clear() {
        this.container.innerHTML = '';
    }

    addSciToDocument(sci, index) {
        this.container.appendChild(createSciElements(sci));
        const image = document.getElementById(`preview-${index}`)
        const container = document.getElementById(`preview-container-${index}`)
        image.onload = () => {
            Frame.render(image, container, sci.printSize, sci.frameStyle, sci.frameWidth, sci.matColor, sci.matWidth)
        }
        document.getElementById(`cart-remove-${index}`).onclick = () => { 
            removeEntry(index);
            loadCartItems();
        };

        function createSciElements(sci) {
            const article = document.createElement('div');

            let frameDescription = `${sizeDesc[sci.printSize]} print in a ${sci.frameWidth / 10} 
            cm ${sci.frameStyle} frame`
            if (!!sci.matWidth) {
                frameDescription += ` with a ${sci.matWidth / 10} 
                cm ${sci.matColor} mat`;
            }
            frameDescription += '.';

            let searchParams = `config.html?objectID=${sci.id}&printSize=${sci.printSize}&frameStyle=${sci.frameStyle}&frameWidth=${sci.frameWidth}&matColor=${sci.matColor}&matWidth=${sci.matWidth}`

            article.innerHTML =
                `<div class="cart-item">
        <div class="cart-preview" id="preview-container-${index}">
          <a href="${searchParams}">
            <img class="cart-thumb" src="${sci.image}" id="preview-${index}" alt="${sci.title}">
          </a>
        </div>
        <div class="museum-label">
          <div>
          <span class="artist">${sci.artist}</span>
          <span class="title">${sci.title}</span>,
          <span class="date">${sci.date}</span>
            <br><br>
            <span class="frame-description">${frameDescription}</span>
          </div>
          <div class="cart-price">€ <span id="price-${index}">${sci.price}</span></div>
          <button class="cart-remove" id="cart-remove-${index}"></button>
        </div>
      </div>`
            return article;
        }
    }



}

