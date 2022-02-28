
    import * as CheckoutUtil from './checkout.js'; 
    import * as Models from './models.js';
    
    

    document.addEventListener('DOMContentLoaded', event => {
      let currentDestinationIndex = 0;
      let cart = Models.retrieveCart();
      console.log(cart);
      let subtotal = CheckoutUtil.getSubtotal(cart.items);
      CheckoutUtil.setSubtotal(subtotal);

      if (CheckoutUtil.isCartEmpty())
    
      const selection = document.querySelector('#country');
      selection.addEventListener('change', event => {
          currentDestinationIndex = selection.selectedIndex;
          displayCheckout(currentDestinationIndex)
      });

      CheckoutUtil.addSelectionDestinations();

      displayCheckout(currentDestinationIndex);

      async function displayCheckout(currentDestinationIndex){
        const destinations = await CheckoutUtil.retrieveDestinations(); 
        let currentDestination = destinations[currentDestinationIndex];
        let shippingCosts = 0;
        let total = 0;

        shippingCosts = currentDestination.cost / 100;
        total = shippingCosts + subtotal;
        shippingCosts = shippingCosts.toFixed(2);
        total = total.toFixed(2);

        CheckoutUtil.setFinalPrices(shippingCosts, total);
        console.log(document.getElementById('price-shipping'));  
      }
      });
  