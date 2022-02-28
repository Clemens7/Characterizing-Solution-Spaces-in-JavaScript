

    import * as Frame from './frame.js';

    function reset_shopping_cart(){
      document.getElementById("checkout-button").onclick = ;
      document.getElementById("checkout-button").disabled = false;
      document.getElementById("price-total").innerText = "0";
      document.querySelectorAll(".cart-item").forEach();
      document.getElementById('cart-link').innerText = `Cart`;

      if (!('cart' in localStorage) || localStorage.cart === "" || localStorage.cart === "[]"){
        //alert("There are no items in your shopping cart.");
        document.getElementById("cart").insertAdjacentText('afterbegin', 'There are no items in your shopping cart.');

        document.getElementById("checkout-button").disabled = true;
      }
    }

    

    async function fill_shopping_cart(){

      const cart_container = document.getElementById("cart");

      if ("cart" in localStorage && localStorage.cart !== "") {
        const my_cart = JSON.parse(localStorage.cart);
        for (let c of my_cart) 
      }

    }

    

    




    
    
    

    window.onload = function(){
      reset_shopping_cart();
      fill_shopping_cart();
    };

  