import { readCartSizeFromCache } from './cache.js';
import { Artwork, Configuration } from './classes.js';
import { calculatePrice, render } from './frame.js';

/**
 * @returns {HTMLElement}
 */
function createHtmlNode(tagName, attributes, children) {
  const node = document.createElement(tagName);
  if (attributes) {
    for (const [key, value] of Object.entries(attributes)) {
      if (key === 'events') {
        for (const [name, handler] of Object.entries(value)) {
          node.addEventListener(name, handler);
        }
      } else if (key === 'style') {
        for (const [styleKey, styleValue] of Object.entries(value)) {
          node.style[styleKey] = styleValue;
        }
      } else {
        node.setAttribute(key, value);
      }
    }
  }
  if (typeof children === 'string') {
    node.innerText = children;
  } else if (Array.isArray(children)) {
    for (const child of children) {
      if (typeof child === 'string') {
        // Text node as a child
        node.appendChild(document.createTextNode(child));
      } else {
        // HTML node as a child
        node.appendChild(child);
      }
    }
  } else {
    // No children
  }
  return node;
}

const h = createHtmlNode;

/**
 * @param artwork {Artwork}
 */
export 

const printSizeLabels = {
  'S': 'Small',
  'M': 'Medium',
  'L': 'Large',
};

/**
 * @param item {Configuration}
 */
function getFrameDescription(item) {
  return `${printSizeLabels[item.printSize]} print in a ${item.frameWidth / 10} cm ${item.frameStyle} frame${item.matWidth === 0 ? '' : ` with a ${item.matWidth / 10} cm ${item.matColor} mat`}.`;
}

/**
 * @param index {number}
 * @param item {Configuration}
 * @param artwork {Artwork}
 * @param onDelete {Function}
 */
export function createCartItem({ index, item, artwork, onDelete }) {
  /**
   * Template:
   * <div class="cart-item">
   *   <div class="cart-preview" id="preview-container-0">
   *     <a href="">
   *       <img class="cart-thumb" src="" id="preview-0" alt="">
   *     </a>
   *   </div>
   *   <div class="museum-label">
   *     <div>
   *       <span class="artist"></span>
   *       <span class="title"></span>,
   *       <span class="date"></span>
   *       <br><br>
   *       <span class="frame-description"></span>
   *     </div>
   *     <div class="cart-price">€ <span id="price-0">0</span></div>
   *     <button class="cart-remove"></button>
   *   </div>
   * </div>
   */
  const img = h('img', {
    class: 'cart-thumb',
    src: artwork.primaryImageSmall,
    id: `preview-${index}`,
    alt: artwork.title,
    style: {
      // Make it invisible until the image is loaded and the Frame.render function was called
      visibility: 'hidden',
    },
    events: {
      load() {
        render(img, imgContainer, item.printSize, item.frameStyle, item.frameWidth, item.matColor, item.matWidth);
        img.style.visibility = 'visible';
      },
    },
  });
  const linkParams = new URLSearchParams();
  linkParams.set('objectID', artwork.objectID);
  linkParams.set('printSize', item.printSize);
  linkParams.set('frameStyle', item.frameStyle);
  linkParams.set('frameWidth', item.frameWidth);
  linkParams.set('matColor', item.matColor);
  linkParams.set('matWidth', item.matWidth);
  const imgContainer = h('a', { href: `config.html?${linkParams.toString()}` }, [img]);
  return h('div', { class: 'cart-item' }, [
    h('div', { class: 'cart-preview', id: `preview-container-${index}` }, [imgContainer]),
    h('div', { class: 'museum-label' }, [
      h('div', {}, [
        h('span', { class: 'artist' }, artwork.artistDisplayName),
        ' ',
        h('span', { class: 'title' }, artwork.title),
        ', ',
        h('span', { class: 'date' }, artwork.objectDate),
        h('br'),
        h('span', { class: 'frame-description' }, getFrameDescription(item)),
      ]),
      h('div', { class: 'cart-price' }, [
        '€ ',
        h('span', { id: `price-${index}` }, calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth).toFixed(2)),
      ]),
      h('button', { class: 'cart-remove', events: { click: onDelete } }),
    ]),
  ]);
}

export function updateCartLink() {
  const element = document.getElementById('cart-link');
  if (element) {
    const numCartItems = readCartSizeFromCache();
    element.innerText = numCartItems > 0 ? `Cart (${numCartItems})` ;
  }
}
