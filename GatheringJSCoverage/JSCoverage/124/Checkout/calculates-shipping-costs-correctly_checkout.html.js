
  import * as Checkout  from "./checkout.js";
  import * as Shipping  from "./shipping.js";


    document.addEventListener('DOMContentLoaded', event => {
      var cartArray = JSON.parse(localStorage.getItem("cart") );
      document.getElementById("pay-button").disabled = true;
      if (cartArray.length === 0) 
        Checkout.getShipping().then(function(data){
        Checkout.addShippingToContainer(data);
        //set default
        document.getElementById("price-shipping").innerHTML = Checkout.getShippingPrice(data[0].country, data);
        document.getElementById("price-total").innerHTML = Checkout.calculateTotal(data[0].country, data);
      });

    });

    document.getElementById("price-subtotal").innerHTML = Checkout.calculateSubtotal();

    document.getElementById("country").addEventListener('change', event => {
      Checkout.getShipping().then(function(data){
          var e = document.getElementById("country");
          var country = e.options[e.selectedIndex].value;
          document.getElementById("price-shipping").innerHTML = Checkout.getShippingPrice(country, data);
          document.getElementById("price-total").innerHTML = Checkout.calculateTotal(country, data);
        });
    });
  