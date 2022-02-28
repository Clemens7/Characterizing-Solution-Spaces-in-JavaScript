
    import {retrieveCart} from "./artmart-cache.js";
    import artmartAPI from "./artmartAPI.js";
    import {calculatePrice} from "./frame.js";
  
    var cart;
    var shippingCost;
    var destinations;
    
    document.addEventListener('DOMContentLoaded', async (event) => {
        cart = retrieveCart();
        if(cart===undefined || cart.length == 0 ) 

        document.getElementById('pay-button').disabled = true;
  
        var country = document.getElementById("country");
        country.addEventListener('change', function() {
          const destination = destinations.find(obj => obj.country == this.value);
          shippingCost = destination.cost;
          calculateTotalPrice();
        });
  
        calculateTotalPrice();
  
        populateDestinations();
    });
  
    async function populateDestinations() {
      destinations = await artmartAPI.getShipping();
      if(destinations===undefined || destinations.destinations.length == 0)
      

      destinations = destinations.destinations;
      shippingCost = destinations[0].cost;
      var country = document.getElementById("country");
      for(var i = 0; i < destinations.length; ++i)
      {
        var option = document.createElement("option");
        option.value = destinations[i].country;
        option.text = destinations[i].displayName;
        country.add(option);
      }
  
      calculateTotalPrice();
    }
  
    function calculateTotalPrice(){
      var subtotal = 0;
  
      for(var i = 0; i < cart.length; ++i) {
        const artObject = cart[i];
        subtotal += calculatePrice(artObject.printSize, artObject.frameStyle, artObject.frameWidth, artObject.matWidth);
      }
  
      document.getElementById('price-subtotal').innerText = subtotal.toFixed(2);
      if(shippingCost === undefined || isNaN(shippingCost))
      {
        document.getElementById('price-shipping').innerText = '—';
        document.getElementById('price-total').innerText = '—';
        document.getElementById('pay-button').disabled = true;
      } else {
        document.getElementById('price-shipping').innerHTML = (shippingCost / 100).toFixed(2);
        document.getElementById('price-total').innerText = (Number(subtotal) + (Number(shippingCost)/100)).toFixed(2);
        document.getElementById('pay-button').disabled = false;
      }
    }
  
  