import { render, calculatePrice } from './frame.js';
import { setCartItemsInHeader } from './header-cart.js';
/**
 * Add a painting to the shopping cart display page
 * @param {Painting} painting The painting to add to the shopping cart display
 */
export function addPictureToDom(painting,positionInCart) {

  // tags anlegen

  const divCartItem = document.createElement('div');
  divCartItem.setAttribute('class', 'cart-item');
  divCartItem.setAttribute('id', `cartItem${positionInCart}`);

  const divCartPreview = document.createElement('div');
  divCartPreview.setAttribute('class', 'cart-preview');
  divCartPreview.setAttribute('id', `preview-container-${painting.objectID}`);

  const aHref = document.createElement('a');
  aHref.setAttribute('href', '');

  const img = document.createElement('img');
  img.setAttribute('class', 'cart-thumb');
  img.setAttribute('src', '');
  img.setAttribute('id', `preview-${painting.objectID}`);
  img.setAttribute('alt', '');

  const divMuseum = document.createElement('div');
  divMuseum.setAttribute('class', 'museum-label');

  const div4 = document.createElement('div');

  const spanArtist = document.createElement('span');
  spanArtist.setAttribute('class', 'artist');

  const spanTitle = document.createElement('span');
  spanTitle.setAttribute('class', 'title');

  const spanDate = document.createElement('span');
  spanDate.setAttribute('class', 'date');

  const brk1 = document.createElement('br');
  const brk2 = document.createElement('br');

  const spanDesc = document.createElement('span');
  spanDesc.setAttribute('class', 'frame-description');

  const divCartPrice = document.createElement('div');
  divCartPrice.setAttribute('class', 'cart-price');

  const spanPrice = document.createElement('span');
  spanPrice.setAttribute('id', `price-${painting.objectID}`);

  const btnRemove = document.createElement('button');
  btnRemove.setAttribute('class', 'cart-remove');

  btnRemove.onclick = removeItemfromCart;
  btnRemove.setAttribute('id', positionInCart);


  // tag-hierarchie aufbauen
  const cartstart = document.getElementById('cart');

  cartstart.prepend(divCartItem);

  divMuseum.appendChild(div4);
  divMuseum.appendChild(divCartPrice);
  divMuseum.appendChild(btnRemove);

  divCartPrice.appendChild(spanPrice);

  div4.appendChild(spanArtist);
  div4.appendChild(spanTitle);
  div4.appendChild(spanDate);
  div4.appendChild(brk1);
  div4.appendChild(brk2);
  div4.appendChild(spanDesc);

  divCartPreview.appendChild(aHref);
  aHref.appendChild(img);

  divCartItem.appendChild(divCartPreview);
  divCartItem.appendChild(divMuseum);

  // tags befuellen ToDo

  img.src = painting.primaryImageSmall;
  img.alt = `Artwork ${painting.title} of ${painting.artistDisplayName}`;
  aHref.href = `config.html?objectID=${painting.objectID}&printSize=${painting.printSize}&frameStyle=${painting.frameStyle}&frameWidth=${painting.frameWidth}&matColor=${painting.matColor}&matWidth=${painting.matWidth}`;

  spanArtist.innerHTML = `${painting.artistDisplayName}`;
  spanTitle.innerHTML = `${painting.title}` + ', ';
  spanDate.innerHTML = `${painting.objectDate}`;

  const printSize = `${painting.printSize}`;
  const frameStyle = `${painting.frameStyle}`;
  const frameWidth = `${painting.frameWidth}`;
  const matColor = `${painting.matColor}`;
  const matWidth = `${painting.matWidth}`;

  // update description
  let desc = showDescription(
    printSize,
    frameStyle,
    frameWidth,
    matColor,
    matWidth
  );
  spanDesc.innerHTML = desc;

  // calculate price for each item
  let price = calculateItem(printSize, frameStyle, frameWidth, matWidth);
  spanPrice.innerHTML = price;

  // show correct size of images
  render(
    img,
    divCartPreview,
    printSize,
    frameStyle,
    frameWidth,
    matColor,
    matWidth
  );
}
/**
 * Allow the user to remove items from the cart by clicking on the circled "x".
 */


function calculateItem(printSize, frameStyle, frameWidth, matWidth) {
  let costs = calculatePrice(
    printSize,
    frameStyle,
    frameWidth,
    matWidth
  ).toFixed(2);
  return costs;
}

export function calcTotal() {
  let price = 0;
  const totalCostDisplay = document.querySelector('#price-total');

  const shoppingCart = JSON.parse(localStorage.getItem('cart'));

  for (let i = 0; i < shoppingCart.length; i++) {
    price += calculatePrice(
      shoppingCart[i].printSize,
      shoppingCart[i].frameStyle,
      shoppingCart[i].frameWidth,
      shoppingCart[i].matWidth
    );
  }

  console.log({ price });

  if (price) {
    totalCostDisplay.innerHTML = price.toFixed(2);
  }
}

function showDescription(
  printSize,
  frameStyle,
  frameWidth,
  matColor,
  matWidth
) {
  let size;
  if (printSize === 'S') {
    size = 'Small';
  } else if (printSize === 'M')  else {
    size = 'Large';
  }

  // TODO: check why matWidth === 0 is false
  let description = `${size} print in a ${formateCentimeters(
    frameWidth
  )} cm ${frameStyle} frame${
    matWidth == 0
      ? '.'
      : ` with a ${formateCentimeters(matWidth)} cm ${matColor} mat.`
  }`;

  return description;
}

function formateCentimeters(width) {
  let format = width / 10;
  format = format.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  });
  return format;
}

export 
