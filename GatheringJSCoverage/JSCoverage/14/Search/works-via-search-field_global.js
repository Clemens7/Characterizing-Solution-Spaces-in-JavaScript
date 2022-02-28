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

async function fetchProductData(objectID) {
  let response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);
  let data = await response.json();
  return data;
}

//cache

async function getObject(objectID){
  let object;
  if(!localStorage.getItem(objectID)){
    object = await fetchProductData(objectID);
    localStorage.setItem(objectID, JSON.stringify(object));
    return object;
  }