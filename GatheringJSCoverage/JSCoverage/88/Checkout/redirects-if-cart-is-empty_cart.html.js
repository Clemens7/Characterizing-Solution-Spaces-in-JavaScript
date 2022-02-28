
    import {calculatePrice, render} from "./frame.js";
    import {saveShoppingCart, getShoppingCart} from "./Util.js";
    import CartItem from "./CartItem.js";
    import ShoppingCart from "./ShoppingCart.js";

/*    let cart = [ { "objectID": 39799,
                  "printSize": 'M',
                  "frameStyle": 'classic',
                  "frameWidth": 4,
                  "matColor": 'red',
                  "matWidth": 5},
                { "objectID": 437853,
                  "printSize": 'L',
                  "frameStyle": 'shabby',
                  "frameWidth": 3,
                  "matColor": 'red',
                  "matWidth": 5},
                { "objectID": 436535,
                  "printSize": 'L',
                  "frameStyle": 'natural',
                  "frameWidth": 5,
                  "matColor": 'red',
                  "matWidth": 6},
                { "objectID": 634108,
                  "printSize": 'M',
                  "frameStyle": 'classic',
                  "frameWidth": 3,
                  "matColor": 'red',
                  "matWidth": 2},
                { "objectID": 435882,
                  "printSize": 'L',
                  "frameStyle": 'elegant',
                  "frameWidth": 6,
                  "matColor": 'red',
                  "matWidth": 7},
                { "objectID": 459054,
                  "printSize": 'M',
                  "frameStyle": 'classic',
                  "frameWidth": 4,
                  "matColor": 'red',
                  "matWidth": 5}
            ];
    localStorage.setItem("cart", JSON.stringify(cart));*/

    let shoppingCart = getShoppingCart();
    //shoppingCart.items.reverse();

    let items = document.getElementById('cart');

    if((localStorage.getItem('cart') != null )) else {

      //when localstorage is empty disable checkout button
      let cartTotal = setCartTotal(false);
      items.appendChild(cartTotal)
    }

    function setCartTotal(notEmpty){

      let cartTotal = document.createElement('div');
      cartTotal.setAttribute('class', 'cart-total');
      //items.appendChild(cartTotal);

      let priceTotal = document.createElement('div');
      priceTotal.setAttribute('class', 'price');
      priceTotal.innerText = 'Total: € ';
      cartTotal.appendChild(priceTotal);

      let priceTotalResult = document.createElement('span');
      priceTotalResult.setAttribute('id', 'price-total');
      priceTotalResult.innerText = 0;
      priceTotal.appendChild(priceTotalResult);

      let checkout = document.createElement('button');
      checkout.setAttribute('type', 'button');
      checkout.setAttribute('id', 'checkout-button');
      checkout.innerText = 'Checkout';

      cartTotal.appendChild(checkout);

      if(!notEmpty){
        checkout.disabled = true;
        items.innerText = 'There are no items in your shopping cart.';
      }
      return cartTotal;
    }

    

  