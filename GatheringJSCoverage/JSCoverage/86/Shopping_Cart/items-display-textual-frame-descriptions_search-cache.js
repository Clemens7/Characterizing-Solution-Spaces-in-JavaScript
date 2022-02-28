

function retrieveFromLocal(key){
  if(key in localStorage){
    return JSON.parse(localStorage[key]);
  }
}



function storeInLocal(key, value){
  localStorage[key] = JSON.stringify(value);
}


function cartCache(){
  const cartCached = retrieveFromLocal("cart");
  if(cartCached && cartCached.length != null){
    document.getElementById('cart-link').innerHTML = `Cart (${cartCached.length})`;
  }
}

export { retrieveFromLocal, storeInLocal, cartCache };
