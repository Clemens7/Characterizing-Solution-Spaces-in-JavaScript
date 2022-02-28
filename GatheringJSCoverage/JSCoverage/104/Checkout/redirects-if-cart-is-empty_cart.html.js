
    import * as Cache from './cache.js'
    import * as Cart from './cart.js'
    import * as Frame from './frame.js'
    import * as Common from './common.js'

    //Cart.resetCart(Cache.store);
    //Cart.loadTestCart(Cache.store);

    let shoppingCart = Cache.retrieve('cart');
    let sp2 = document.getElementById("cart-total");
    let cart = document.getElementById('cart');

    showShoppingCart();

    async function showShoppingCart() {

      if (Common.getNumberOfObjectsInCart() == 0) {
        const emptyElem = document.createElement('div');
        document.getElementById('checkout-button').disabled = true;
        emptyElem.innerHTML = '<span>There are no items in your shopping cart.</span>';
        cart.insertBefore(emptyElem, sp2);
        return;
      }}

    

    

    

    

    

    document.getElementById("cart-link").innerHTML =
      "Cart (" + Common.getNumberOfObjectsInCart() + ")";

    

    

    

    

    

  