import {
  ShoppingCartItem
} from './shopping-cart.js';

import * as DOM from './dom-helpers.js';
import * as Frame from './frame.js';
import * as ShoppingCartStorage from './shopping-cart-storage.js';
import * as MetmuseumAPI from './metmuseum-api.js';

export class ShoppingCartDOM {
  constructor(items) {
    this.items = items;
    this.containerId = 'cart';
  }

  updateCartLink() {
    const cartLink = document.getElementById('cart-link');

    if (this.items && this.items.length > 0) {
      cartLink.innerText = `Cart (${this.items.length})`;
    }
  }

  updateTotal(total) {
      document.querySelector('#price-total').innerText = total.toFixed(2);
  }

  reset() {
    Array.from(document.querySelectorAll('.cart-item')).forEach(e => e.parentNode.removeChild(e));
  }

  async addItemsToContainer() {
    this.index = 0;
    this.container = document.getElementById(this.containerId);

    if (!this.container) 

    if (!this.items || this.items.length == 0) 

    Promise.all(this.items.map(item => this.createCartItem(item)))
      .then( (allPrices) => {
        console.info('Calculating Total costs', allPrices);
        const totalCosts = allPrices.reduce( (accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0);
        console.info('Total costs=', totalCosts);
        this.updateTotal(totalCosts);
    });


  }

  async createCartItem(item) {
    const artmart = await MetmuseumAPI.retrieveObject(item.objectID);

    const price = Frame.calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);

    const itemElement = this.createItemElement(item, artmart, price, this.index++);
    this.container.insertBefore(itemElement, this.container.lastElementChild);

    const previewImage = itemElement.querySelector('.cart-thumb');
    const previewContainer = itemElement.querySelector('.cart-preview');
    Frame.loadPreviewImage(artmart, previewImage)
      .then( (initializedImage) =>
        // make sure image is fully loaded before we render frame, to be able to calculate correct image height/width
        Frame.render(initializedImage, previewContainer,
          item.printSize, item.frameStyle, item.frameWidth, item.matColor, item.matWidth)
      );
    return price;
  }

  createItemElement(item, artmart, price, i) {
    return DOM.setAttributes(DOM.container([
      this.createCartPreview(item, artmart, i),
      DOM.setAttributes(DOM.container([
        DOM.container([
          DOM.setAttributes(DOM.textElement('span', artmart.artistDisplayName), {
            classList: 'artist'
          }),
          DOM.setAttributes(DOM.textElement('span', artmart.title), {
            classList: 'title'
          }),
          document.createTextNode(', '),
          DOM.setAttributes(DOM.textElement('span', artmart.objectDate), {
            classList: 'date'
          }),
          document.createElement('br'),
          document.createElement('br'),
          DOM.setAttributes(DOM.textElement('span', this.getFrameDescription(item)), {
            classList: 'frame-description'
          }),
        ]),
        this.createCartPrice(price, i),
        this.createRemoveButton(i)
      ]), {
        classList: 'museum-label'
      })
    ]), {
      classList: 'cart-item'
    });
  }

  getFrameDescription(item) {
    var printSize;

    switch (item.printSize) {
      case 'S':
        printSize = 'Small';
        break;
      case 'M':
        printSize = 'Medium';
        break;
      case 'L':
        printSize = 'Large';
        break;
    }

    return `${printSize} print in a ${item.frameWidth / 10} cm ${item.frameStyle} frame${item.matWidth > 0 ? ` with a ${item.matWidth / 10} cm ${item.matColor} mat` }.`;
  }

  createCartPreview(item, artmart, i) {
    const cartPreview = DOM.setAttributes(DOM.container([
      DOM.setAttributes(DOM.container([
        DOM.setAttributes(document.createElement('img'), {
          src: 'null', // will be set and loaded via promise
          id: `preview-${i}`,
          classList: 'cart-thumb',
          alt: artmart.objectName
        })
      ], 'a'), {
        href: `config.html?objectID=${item.objectID}&printSize=${item.printSize}&frameStyle=${item.frameStyle}&frameWidth=${item.frameWidth}&matColor=${item.matColor}&matWidth=${item.matWidth}`
      })
    ]), {
      classList: 'cart-preview',
      id: `preview-container-${i}`
    });

    return cartPreview;
  }

  createCartPrice(price, i) {
    return DOM.setAttributes(DOM.container([
      document.createTextNode('€ '),
      DOM.setAttributes(DOM.textElement('span', price.toFixed(2)), {
        id: `price-${i}`
      })
    ]), {
      classList: 'cart-price'
    });
  }

  createRemoveButton(i) {
    const button = DOM.setAttributes(DOM.container([], 'button'), {
      classList: 'cart-remove'
    });

    button.addEventListener('click', this.removeItemAtIndex.bind(this, i));

    return button;
  }

  removeItemAtIndex(i) {
    this.items.splice(i, 1);
    ShoppingCartStorage.store(this.items);
    this.reset();
    this.addItemsToContainer();
    this.updateCartLink();
  }
}
