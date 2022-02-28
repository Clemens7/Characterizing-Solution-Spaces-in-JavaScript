
    import * as frame from './frame.js';

    

    async function displayCart(cartData) {
      if (cartData.length == 0) {

        let html = '';

        html += '<div><span>There are no items in your shopping cart.</span></div>';

        html += '<div class="cart-total">';
        html += '<label class="price"></label>';
        html += '<button type="submit" class="checkout-button" id="checkout-button" disabled>Checkout</button>';
        html += '</div>';


        document.getElementById('cart').innerHTML = html;

      }
    }

    
    window.removeProductFromCart = removeProductFromCart;


    let cartData = getCartData();
    console.log(cartData);
    updateNavigationText(cartData);
    displayCart(cartData);

  