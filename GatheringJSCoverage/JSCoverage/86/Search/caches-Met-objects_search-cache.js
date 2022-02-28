

function retrieveFromLocal(key){
  if(key in localStorage){
    return JSON.parse(localStorage[key]);
  }
}






function cartCache(){
  const cartCached = retrieveFromLocal("cart");
  if(cartCached 
}

export { retrieveFromLocal, storeInLocal, cartCache };
