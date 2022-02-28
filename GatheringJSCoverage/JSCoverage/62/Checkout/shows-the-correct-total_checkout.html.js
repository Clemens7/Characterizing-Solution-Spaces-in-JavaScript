
   /* import * as DAL from "./DAL.js";
    import {calculatePrice} from "./frame.js"

    let priceMap = {};

    //redirect if cart is empty
    if(localStorage.getItem("cart")==null)
    {
      window.location.href = "cart.html";
    }
    else{
      country.addEventListener('change', refreshShipping);
      getDestinations();
      calcSubtotal();
    }

    //load and set destinations for shipping
    function getDestinations(){

    document.getElementById("price-total").innerHTML="&mdash;";
    document.getElementById("price-shipping").innerHTML="&mdash;";
    document.getElementById("pay-button").disabled = true;  

    fetch("https://web-engineering.big.tuwien.ac.at/s20/a2/shipping")
    .then(response => response.json())
    .then(data => {

      let destinations=data.destinations;
      console.log(destinations);
      let options="";
      for (let i = 0; i < destinations.length; i++) { 
        console.log(destinations[i]); 
        options+="<option value=" + destinations[i].country + ">"+
                  destinations[i].displayName+"</option>";
        priceMap[destinations[i].country] = destinations[i].cost;
      } 
      document.getElementById("country").innerHTML=options;
      document.getElementById("pay-button").disabled = false;

      refreshShipping();

    })
    .catch(err	=>{
      console.log(err);
      document.getElementById("price-total").innerHTML="&mdash;";
      document.getElementById("price-shipping").innerHTML="&mdash;";
      document.getElementById("pay-button").disabled = true;
    }	);
  }


  function refreshShipping()
  {
    let shipping = (parseFloat(priceMap[document.getElementById("country").value]) / 100).toFixed(2);
    document.getElementById("price-shipping").innerHTML = shipping;
    let subtotal = calcSubtotal();
    costTotal(shipping, subtotal);    

    return shipping;
  }

  /*window.onload=function() {
  let filter = document.getElementById('country');
  filter.onchange=function() {
    const shipping = parseFloat(document.getElementById("country").value) / 100;
    document.getElementById("price-shipping").innerHTML = shipping;
    const subtotal = calcSubtotal();
    costTotal(shipping, subtotal);    
    return shipping;
  } 
  }
  function costTotal(shipping, subtotal)
  {
    let total = Number(shipping) + Number(subtotal);
    document.getElementById("price-total").innerHTML = total;
  }

  //calculate and set subtotal of cart
  function calcSubtotal() {
    console.log("calcSubtotal");
    let cart = JSON.parse(window.localStorage.getItem("cart"));
    let subtotal=0.00;
    if(cart){
    cart.forEach(item => {
      subtotal += calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
      });
    }
    document.getElementById("price-subtotal").innerHTML=subtotal;
    return subtotal;
  }

*/

  