import { CartItem } from "./cart-item.js";
import { ResultItem } from "./result-item.js";
import { CartContainer } from "./cart-container.js";
import * as Frame from "./frame.js";
import * as ElementCreator from './element-creator.js';



export 

export 

export 

export function createCheckout(priceTotal, buttonDisabled = false) {
  const spanElem = ElementCreator.create_TextElement('span', '', { id: 'price-total' }, []);

  spanElem.innerText = parseFloat(priceTotal).toFixed(2);
  const priceElem = document.createElement('div');
  priceElem.className = 'price';
  priceElem.innerText = 'Total: € ';

  priceElem.appendChild(spanElem);

  const totalButton = ElementCreator.create_TextElement('button', 'Checkout', { type: 'button', id: 'checkout-button', onclick: "window.location.href='checkout.html';" }, []);
  totalButton.disabled = buttonDisabled;

  const cartTotalElem = ElementCreator.create_Container([priceElem, totalButton], 'div', ['cart-total'], {});

  document.getElementById('cart').appendChild(cartTotalElem);

}

export 

export 


// TODO Make a Js file for utility functions like this one.
export 

export 

