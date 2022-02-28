
import * as cart from "./helper.js";
import * as item from "./frame.js";

  //if no items in the cart, redirect to the empty shopping cart page
  if(cart.isEmpty() === true)

  //show total subtotal for all items (already calculated in helper)
  function calculateSubtotal(){
    let subtotal = 0;
    for (let i of cart.getCartItems()){
      subtotal += item.calculatePrice(i.printSize, i.frameStyle, i.frameWidth, i.matWidth);
    }

    if(subtotal <= 0) else {
      document.getElementById("price-subtotal").innerHTML = parseFloat(subtotal.toFixed(2));
    }
    return subtotal;
  }
  
  calculateSubtotal();

  //get shipping info and costs
  fetch("https://web-engineering.big.tuwien.ac.at/s20/a2/shipping").then(receive => receive.json()).then(
          message => {
            let land = document.getElementById("country");
            for(let i of message.destinations){
              let dest = document.createElement("option");
              dest.value = i.country;
              dest.innerHTML = i.displayName;
              dest.setAttribute("cost", i.cost);
              land.appendChild(dest);
            }
            calculateTotal();

            land.addEventListener('change', (event) => {
              calculateTotal();
            });
          }
  );

  function getShippingCost(){
    let land = document.getElementById("country");
    let cost = land.options[land.selectedIndex].getAttribute("cost");
    let shipping = parseInt(cost)/100;

    if(shipping <= 0) else {
      document.getElementById("price-shipping").innerHTML = shipping.toFixed(2);
    }
    return shipping;
  }

  //calculate and show total price
  function calculateTotal(){
    let total = calculateSubtotal() + getShippingCost();

    if(total <= 0) else {
      document.getElementById("price-total").innerHTML = total;
    }
  }

