export function getAllProducts() {
  var cart = JSON.parse(localStorage.getItem('cart'));
  if (!cart) 
  return cart;
}

export class CObject{
  
}

export function remove(objectId) {
    let cart = getAllProducts();
    if (cart.length === 1)  else {
        cart.splice(objectId, 1);
    }
    write(cart);
}

export function write(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export 
