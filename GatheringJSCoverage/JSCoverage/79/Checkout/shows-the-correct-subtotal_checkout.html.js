
    import { calculatePrice } from './frame.js';

    const URL = 'https://web-engineering.big.tuwien.ac.at/s20/a2/shipping';
    const DROPDOWN = document.getElementById('country');
    var SHIPPING_COST = 0.0;
    var SUBTOTAL = 0.0;

    document.addEventListener('DOMContentLoaded', event => {
      if(localStorage.getItem('cart') === null)
    });
    calculateSubtotal(JSON.parse(localStorage.getItem('cart')));
    
    document.getElementById('country').addEventListener('change', selectedCountryChanged);

    async function calculateTotal(){
      if(isNaN(SUBTOTAL) || SUBTOTAL === 0 || SHIPPING_COST === 0)
      let total = SHIPPING_COST + SUBTOTAL;
      //console.log('Type of subtotal: ', typeof(SUBTOTAL));
      //console.log('Subtotal: ', SUBTOTAL);
      //console.log('Type of shipping: ', typeof(SHIPPING_COST));
      //console.log('shipping cost: ', SHIPPING_COST);
      //console.log('TOTAL: ', total);
      if(!isNaN(total)){
        document.getElementById('price-total').innerHTML = total.toFixed(2);
      }
    }

    async function calculateSubtotal(data){
      for(let i = 0; i < data.length; i++){
        SUBTOTAL += calculatePrice(data[i].printSize, data[i].frameStyle, data[i].frameWidth, data[i].matWidth);
      }
      document.getElementById('price-subtotal').innerHTML = SUBTOTAL.toFixed(2);
      await createDropdownlist();
      calculateTotal();
    }

    

    async function createDropdownlist(){
      try{
        const response = await fetch(URL);
        const data = await response.json();
        const x = await myFun(data);
        
        let option;

        for(let i = 0; i < data.destinations.length; i++){
          option = document.createElement('option');
          option.innerHTML = data.destinations[i].displayName;
          option.value = data.destinations[i].country;
          DROPDOWN.add(option);
        }
        if(DROPDOWN.length !== 0){
          SHIPPING_COST = data.destinations[0].cost / 100;
          document.getElementById('price-shipping').innerHTML = SHIPPING_COST.toFixed(2);
        }
      }
      
    }

    async function myFun(data){
      return data;
    }

  