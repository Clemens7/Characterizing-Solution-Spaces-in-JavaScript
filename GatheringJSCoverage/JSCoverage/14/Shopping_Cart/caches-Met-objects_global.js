function getCartData() {
  let storageData = localStorage.getItem('cart');
  if (!storageData) 
  return JSON.parse(storageData);
}

function updateNavigationText(cartData) {
  if (cartData.length == 0)  else {
    document.getElementById('cart-link').innerText = 'Cart (' + cartData.length + ')';

  }
}



//cache

async function getObject(objectID){
  let object;
  if(!localStorage.getItem(objectID)) else {
    return JSON.parse(localStorage.getItem(objectID));
  }