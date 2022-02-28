import { render, calculatePrice } from "./frame.js";
class ArtworkFull {
  constructor(oid, artist, title, date, image, price, frameDescription, index, printSize, frameWidth, frameStyle, matWidth, matColor, configPath) {
    this.oid = oid;
    this.artist = artist;
    this.title = title;
    this.date = date;
    this.image = image; 
    this.price = price;
    this.frameDescription = frameDescription;
    this.index = index;
    this.printSize = printSize;
    this.frameWidth = frameWidth;
    this.frameStyle = frameStyle;
    this.matWidth = matWidth;
    this.matColor = matColor;
    this.configPath = configPath;
  }
}
window.onload = () => {
  let configs = JSON.parse(localStorage.getItem('cart'));
  base();
  // Is there a cart
  if (configs) {
    //Elements in the cart
    if (configs.length > 0) {
      setHeader(configs.length);
      load(configs);
    }
  }
};
/**
 * Loads a basic empty page
 **/
function base() {
  document.getElementById('cart').innerHTML = '<div id="empty-cart">There are no items in your shopping cart.</div>';
  document.getElementById('cart').appendChild(createTotalPrice(false));
  setHeader(0);
}
/**
 * load artwork information corresponding to objectID's, then appends cart items
 * @param configs {Artwork[]}
 */
function load(configs) {
  let cart = document.getElementById('cart');

  try {
    // logic
    let append = (config, j) => {
      if (document.getElementById('empty-cart')) {
        cart.removeChild(document.getElementById('empty-cart'))
      }

      //Check for cached object
      let data = JSON.parse(localStorage.getItem(config.objectID));

      //object not cached
      if (data === null) {
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${config.objectID}`).then((response) => {
          if (response.status !== 200) 
          response.json().then((data) => {
            // cache objects
            localStorage.setItem(config.objectID, JSON.stringify(data));

            //Create artwork
            createArtwork(data, config, j);
          })
        }).catch();
      }
    };

    // Append complete shopping cart
    for (let j = 0; j < configs.length; j++) {
      append(configs[j], j);
    }
  } 
}
/**
 * @param artwork {ArtworkFull}
 * @returns {HTMLDivElement}
 */
function createCartItem(artwork) {
  const cartItem = document.createElement('div');
  cartItem.className = "cart-item";
  cartItem.appendChild(imageContainer(artwork));
  cartItem.appendChild(label(artwork, cartItem));
  return cartItem;
}
/**
 * @param artwork {ArtworkFull}
 * @param elem {HTMLDivElement}
 * @returns {HTMLDivElement}
 **/
function label(artwork, elem) {
  let div = document.createElement('div');
  div.className = 'museum-label';
  div.innerHTML = `
                <div>
                    <span class="artist">${artwork.artist}</span>
                    <span class="title">${artwork.title}</span>,
                    <span class="date">${artwork.date}</span>
                    <br><br>
                    <span class="frame-description">${artwork.frameDescription}</span>
                </div>
                <div class="cart-price">€ <span id="price-${artwork.index}">${artwork.price}</span></div>
                <button class="cart-remove"></button>`;
  div.childNodes[5].addEventListener('click', );
  return div;
}
/**
 * @param artwork {ArtworkFull}
 * @returns {HTMLDivElement}
 **/
function imageContainer(artwork) {
  const div = document.createElement('div');
  div.className = 'cart-preview';
  div.id = `preview-container-${artwork.index}`;

  const a = document.createElement('a');
  const img = document.createElement('img');
  a.href = artwork.configPath;
  a.addEventListener('click', );
  img.className = 'cart-thumb';
  img.src = artwork.image;
  img.id = `preview-${artwork.index}`;

  img.addEventListener('load', ()=>
      render(img, div, artwork.printSize, artwork.frameStyle, artwork.frameWidth, artwork.matColor, artwork.matWidth));

  a.appendChild(img);


  div.appendChild(a);
  return div;
}
/**
 * Removes an artwork from the cart
 * @param artwork {ArtworkFull} the artwork
 * @param elem {HTMLDivElement} the cart element
 **/

/**
 * Updates the total price displayed
 * @param number {number}
 **/
function updatePrice(number) {
  let price = document.getElementById('price-total').innerHTML;
  let newTotal = (parseFloat(price) + number).toFixed(2);
  document.getElementById('price-total').innerHTML = `${newTotal}`;
  // No items to base site else activate checkout button
  if (newTotal === '0.00')  else {
    document.getElementById('checkout-button').disabled = false;
  }
}
/**
 * @param active {boolean}
 * @returns {HTMLDivElement}
 */
function createTotalPrice(active) {
  let div = document.createElement('div');
  div.className = 'cart-total';
  div.innerHTML =
    `<div class="price">Total: € <span id="price-total">0.00</span></div>
             <button type="button" id="checkout-button" ${active  : 'disabled'} >Checkout</button>`;
  div.childNodes[2].addEventListener('click', );
  return div;
}
function setHeader(length) {
  document.getElementById('cart-link').innerText = `Cart ${length > 0 ? '(' + length + ')' : ''}`;
}
/**
 * Creates artwork from met data and configurations.
 * @param data met data
 * @param config configurations
 * @param i identifying index
 */
function createArtwork(data, config, i) {
  let cart = document.getElementById('cart');

  //Create element from loaded data
  let cartItem = new ArtworkFull(
    config.objectID,
    data.artistDisplayName,
    data.title,
    data.objectDate,
    data.primaryImageSmall,
    calculatePrice(config.printSize, config.frameStyle, config.frameWidth, config.matWidth),
    `${{
      "L": "Large",
      "M": "Medium",
      "S": "Small"
    }[config.printSize]} print in a ${config.frameWidth / 10} cm ${config.frameStyle} frame${config.matWidth ? ` with a ${config.matWidth / 10} cm ${config.matColor} mat` : ''}.`,
    i++,
    config.printSize,
    config.frameWidth,
    config.frameStyle,
    config.matWidth,
    config.matColor,
    `./config.html?objectID=${config.objectID}&frameStyle=${config.frameStyle}&matColor=${config.matColor}`
    + `&printSize=${config.printSize}&frameWidth=${config.frameWidth}&`
    + `matWidth=${config.matWidth}`
  );

  //Skip artwork if no image is provided
  if (cartItem.image === '') 

  //Create HTML-div cartItem
  let newElem = createCartItem(cartItem);

  // Checkout button
  let prev = document.getElementsByClassName('cart-total')[0];

  // Insert into the cart
  cart.insertBefore(newElem, prev);

  // Update the total price
  updatePrice(Number(cartItem.price.toFixed(2)));

  return newElem;
}
