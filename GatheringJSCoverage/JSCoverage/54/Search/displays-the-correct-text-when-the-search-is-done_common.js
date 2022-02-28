/**
 * Sets the number displayed next to the cart-link in the header to the number of items in the cart.
 */
export function setCartItemNumber() {
  let numberOfItems = 0;
  const storedCart = localStorage.getItem("cart");
  if (storedCart !== null)  else {
    return;
  }