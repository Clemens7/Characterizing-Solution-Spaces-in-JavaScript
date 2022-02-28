
  function cartStorageIsEmpty () {
  let cart = JSON.parse(localStorage.getItem('cart'));
  if (cart == null) 
  return (cart.length == 0);
  }

  if (cartStorageIsEmpty())  else {
}
  