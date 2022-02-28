import { render, calculatePrice } from './frame.js';
import { setCartItemsInHeader } from './header-cart.js';
/**
 * Add a painting to the shopping cart display page
 * @param {Painting} painting The painting to add to the shopping cart display
 */
export 
/**
 * Allow the user to remove items from the cart by clicking on the circled "x".
 */




export function calcTotal() {
  let price = 0;
  const totalCostDisplay = document.querySelector('#price-total');

  const shoppingCart = JSON.parse(localStorage.getItem('cart'));

  for (let i = 0; i < shoppingCart.length; i++) 

  console.log({ price });

  if (price)  else {
    totalCostDisplay.innerHTML = 0;
  }
}





export function renderEmptyCart() {
    //  If there are no items in the cart, show the message "There are no items in your shopping cart."
    // and disable the checkout button.
    const emptyCartText = document.createElement('div');
    emptyCartText.style.paddingBottom = '20px';
    emptyCartText.innerText = 'There are no items in your shopping cart.';
    document
      .getElementById('cart')
      .prepend(emptyCartText);
    document.getElementById('checkout-button').disabled = true;
}
