export function setCartItemsInHeader() {
  const cartInHeaderElement = document.getElementById('cart-link');
  const cart = JSON.parse(localStorage.getItem('cart'));
  if (cart && cart.length > 0)  else {
    cartInHeaderElement.innerText = 'Cart';
  }
}
