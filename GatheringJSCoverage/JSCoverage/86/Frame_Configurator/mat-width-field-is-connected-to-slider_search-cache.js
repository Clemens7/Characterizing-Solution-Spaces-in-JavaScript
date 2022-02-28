

function retrieveFromLocal(key){
  if(key in localStorage)
}



function storeInLocal(key, value){
  localStorage[key] = JSON.stringify(value);
}


function cartCache(){
  const cartCached = retrieveFromLocal("cart");
  if(cartCached 
}

export { retrieveFromLocal, storeInLocal, cartCache };
