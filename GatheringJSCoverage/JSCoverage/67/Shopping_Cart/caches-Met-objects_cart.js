import { fetchObject, retrieveCart, showCartItems } from "./common.js";
import { calculatePrice, render } from './frame.js';

/*localStorage.setItem('cart', JSON.stringify([
  { objectID: 435844, printSize: 'S', frameStyle: 'classic', frameWidth: 22, matColor: 'ivory', matWidth: 40 },
  { objectID: 435852, printSize: 'M', frameStyle: 'elegant', frameWidth: 33, matColor: 'indigo', matWidth: 60 },
  { objectID: 436950, printSize: 'M', frameStyle: 'shabby', frameWidth: 44, matColor: 'wine', matWidth: 80 },
  { objectID: 201957, printSize: 'L', frameStyle: 'natural', frameWidth: 55, matColor: 'mint', matWidth: 100 },
]));*/

const section = document.querySelector('section');
const totalPrice = document.getElementById('price-total');
const removeButton = document.getElementsByClassName('cart-remove');

const printSizes = {
  S: 'Small',
  M: 'Medium',
  L: 'Large',
}

const renderSingleItem = (item, index) => {
  let templateID = Math.floor(100000 + Math.random() * 900000);
  let template = document.querySelector('template');
  let clone = template.content.cloneNode(true);

  clone.querySelector('.cart-item').id = `${index}`;
  clone.querySelector('#preview-container-0').id = `preview-container-${templateID}`;
  clone.querySelector('.cart-price span').id = `${index}`;

  let link = clone.querySelector('a');
  link.href = `./config.html?objectID=${item.objectID}&printSize=${item.printSize}&frameStyle=${item.frameStyle}`+
  `&frameWidth=${item.frameWidth}&matColor=${item.matColor}&matWidth=${item.matWidth}`;

  let img = clone.querySelector('img');
  img.src = item.primaryImageSmall;
  img.id = `preview-${templateID}`;

  img.onload = () => {
    render(document.querySelector(`#preview-${templateID}`), document.querySelector(`#preview-container-${templateID}`),  item.printSize, item.frameStyle, item.frameWidth, item.matColor, item.matWidth);
  }

  let description = clone.querySelectorAll('span');
  description[0].textContent = item.artistDisplayName;
  description[1].textContent = item.title;
  description[2].textContent = item.objectDate
  let textDescription = `${printSizes[item.printSize]} print`;
  if (item.frameStyle && item.frameWidth) {
    textDescription += ` in a ${item.frameWidth/10} cm ${item.frameStyle} frame`;
  }
  if (item.matColor && item.matWidth) {
    textDescription += ` with a ${item.matWidth/10} cm ${item.matColor} mat`;
  }
  description[3].textContent = textDescription + '.';

  clone.querySelector('.cart-price span').innerHTML = calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth).toFixed(2);
  
  template.parentNode.insertBefore(clone, template.parentNode.firstChild);
}

const calculateAndSetCartPrice = (cart) => {
  let subtotal = 0;
  for (const item of cart) {
    subtotal += calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
  }
  totalPrice.innerHTML = parseFloat(subtotal).toFixed(2);
};

window.removeCartItem = 


const main = async () => {
  showCartItems();
  let cart = retrieveCart();

  if (cart) {
    let items = await Promise.all(cart.map(async (item) => {
      let object = await fetchObject(item.objectID);
      return {...item, ...object};
    }));

    items.forEach( (item, index) => {
      renderSingleItem(item, index);
    });

    calculateAndSetCartPrice(cart);
    return;
  }}

main();
