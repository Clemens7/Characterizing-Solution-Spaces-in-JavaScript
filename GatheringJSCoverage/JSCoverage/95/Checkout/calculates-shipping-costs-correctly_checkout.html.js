
    import * as ArtmartApi from './artmart-api.js';
    import * as Cart from './cart.js';

    if(Cart.getItems().length == 0) 
    
    let payButton = document.getElementById('pay-button');
    payButton.disabled = true;
    let shippingCosts;//map - key: country, value: array [displayName, shippingCost]

    let shippingCost;//shipping cost for currently selected country
    let subtotal;
    let total;
    let selectElement = document.getElementById('country');
    let subtotalElement = document.getElementById('price-subtotal');
    let shippingCostElement = document.getElementById('price-shipping');
    let totalElement = document.getElementById('price-total');
    
    document.addEventListener('DOMContentLoaded', event => {
      updateSubtotal();//have to call that earlier than actually necessary so that test passes
      init();
    });

    selectElement.addEventListener('change', event => {
      updateCostsDisplayed();
    });

    async function init() {
      try {
        await initShippingCosts();
      } 
      fillSelectField();
      updateCostsDisplayed();
      payButton.disabled = false;
    }

    async function initShippingCosts() {
      let response;
      try {
        response = await ArtmartApi.fetchShippingCosts();
      } 

      shippingCosts = response.reduce((map, obj) => {
        map[obj.country] = [obj.displayName, obj.cost / 100];//convert cost from cents to euros
        return map;
      }, {});

      shippingCosts = new Map(Object.entries(shippingCosts));
    }

    function fillSelectField() {
      for (let [country, [displayName, cost]]  of shippingCosts) {
        let option = document.createElement('option');
        option.value = country;
        option.text = displayName;
        selectElement.appendChild(option);
      }
    }

    function updateCostsDisplayed() {
      updateSubtotal();
      updateShippingCost();
      totalElement.innerText = (subtotal + shippingCost).toFixed(2);
    }

    function updateShippingCost() {
      if (!shippingCosts) 
      shippingCost = shippingCosts.get(selectElement.value)[1];//index 0: displayName, index 1: cost
      shippingCostElement.innerText = shippingCost.toFixed(2);
    }

    function updateSubtotal() {
      subtotal = Cart.getTotal();
      subtotalElement.innerText = subtotal.toFixed(2);
    }

    
  