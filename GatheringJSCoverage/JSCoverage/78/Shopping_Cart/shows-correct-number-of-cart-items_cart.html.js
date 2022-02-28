
    import * as Helper from './helper.js';
    import * as Frame from './frame.js';
    
    var items = Helper.getCartItems();
    
    var cartT = document.getElementById("cart");
    
    if(items.length < 1) {
      var divv = document.createElement("div");
      divv.classList.add("cart-item");
      divv.innerHTML = `There are no items in your shopping cart.`;
      cartT.insertBefore(divv, cartT.firstChild);

      // disable checkout button
      document.getElementById("checkout-button").disabled = true;
    } 
    
    Helper.cartItemsSize();
    
    window.remove = 
    
    Helper.getDivsForCartView();
    
  