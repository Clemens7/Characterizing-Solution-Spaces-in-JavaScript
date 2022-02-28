function getCartData() {
  let storageData = localStorage.getItem('cart');
  if (!storageData) {
    // if no data exists in local storage, store an empty array
    storageData = JSON.stringify([]);
    localStorage.setItem('cart', storageData);
  }
  return JSON.parse(storageData);
}

function updateNavigationText(cartData) {
  if (cartData.length == 0) {
    document.getElementById('cart-link').innerText = 'Cart';
  }
}

async function fetchProductData(objectID) {
  let response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);}

//cache

async function getObject(objectID){
  let object;
  if(!localStorage.getItem(objectID)){
    object = await fetchProductData(objectID);