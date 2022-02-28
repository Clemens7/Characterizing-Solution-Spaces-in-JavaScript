function getCartData() {
  let storageData = localStorage.getItem('cart');
  if (!storageData) 
  return JSON.parse(storageData);
}

function updateNavigationText(cartData) {
  if (cartData.length == 0) {
    document.getElementById('cart-link').innerText = 'Cart';
  }
}



//cache

