function getCartData() {
  let storageData = localStorage.getItem('cart');
  if (!storageData) 
  return JSON.parse(storageData);
}





//cache

