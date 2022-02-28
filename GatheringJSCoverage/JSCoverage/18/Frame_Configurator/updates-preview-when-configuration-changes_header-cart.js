export function setCartItemsInHeader() {
  const cartInHeaderElement = document.getElementById('cart-link');
  const cart = JSON.parse(localStorage.getItem('cart'));
  if (cart )  else {
    cartInHeaderElement.innerText = 'Cart';
  }
}
