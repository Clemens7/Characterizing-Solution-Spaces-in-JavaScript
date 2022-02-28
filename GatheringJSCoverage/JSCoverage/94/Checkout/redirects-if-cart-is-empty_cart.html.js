
    import artmartAPI from "./artmartAPI.js";
    import {retrieveCart, removeFromCart} from "./artmart-cache.js";
    import {render, calculatePrice} from "./frame.js";
    
    var cartSection;
    var cartTotal;
    var itemTemplate;

    document.addEventListener('DOMContentLoaded', async (event) => 
    {
      cartSection = document.getElementById("cart");
      cartTotal = document.getElementById("cart-total");
      itemTemplate = document.getElementById("preview-container-0").parentNode;
      cartSection.removeChild(itemTemplate);
      document.getElementById("checkout-button").disabled = true;
      await loadCart();
    });

    document.getElementById("checkout-button").addEventListener("click", );

    

    async function loadCart()
    {
      const cart = retrieveCart();
      if( cart !==undefined )
      
      else
      {
        console.log("There are no items in your shopping cart.");
        document.getElementById("checkout-button").disabled = true;
        document.getElementById("cart-link").innerText = "Cart";
        document.getElementsByClassName("price")[0].innerText = "There are no items in your shopping cart.";
      }
    }

    

    

    

    
  