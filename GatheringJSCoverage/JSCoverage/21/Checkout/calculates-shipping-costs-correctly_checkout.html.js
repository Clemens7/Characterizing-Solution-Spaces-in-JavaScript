
    import { calculateTotalCartPrice, cartIsEmpty } from './config.js';
    import * as shippingApi from './shippingAPI.js'

    const selectCountry = document.getElementById('country');
    const priceTotal = document.getElementById('price-total');
    const priceSubTotal = document.getElementById('price-subtotal');
    const priceShipping = document.getElementById('price-shipping');
    let subTotal = 0;
    let shippingCost = undefined;
    let shippingDict = undefined;
    if (cartIsEmpty())

    displaySubTotal();
    displayTotal();
    (async () => {
      try {
        await displayShippingChoices();
      } 
    })();

    selectCountry.addEventListener ("change", calculateAndDisplayShippingCost);

    function calculateAndDisplayShippingCost() {
        shippingCost = (shippingDict[selectCountry.value]/ 100 ).toFixed(2);
        priceShipping.innerHTML = `${(shippingDict[selectCountry.value]/100).toFixed(2)}`;
        displayTotal();
    }

    function displaySubTotal(){
      try{
        subTotal = calculateTotalCartPrice();
        priceSubTotal.innerText = `${subTotal.toFixed(2)}`
      }
    }

    function displayTotal(){
      if (subTotal !== undefined && shippingCost !== undefined){
        const totalPrice = (parseFloat(subTotal) + parseFloat(shippingCost));
        priceTotal.innerHTML = totalPrice.toFixed(2);
      }
    }

    async function shippingPrices(){
      let destinations = await shippingApi.getShippingDict();
      return destinations
    }

    async function displayShippingChoices(){
      shippingDict = await shippingPrices();
      shippingDict.forEach(dest => {
        shippingDict[dest.country] = dest.cost;
        selectCountry.add(new Option(dest.displayName, dest.country))
      });
        calculateAndDisplayShippingCost()
    }

  