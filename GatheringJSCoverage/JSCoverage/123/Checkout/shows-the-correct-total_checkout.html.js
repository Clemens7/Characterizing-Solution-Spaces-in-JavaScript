
  import * as frame from "./frame.js";

  let subtotal = 0;
  let shippingCost = 0;
  let total = 0;

  let shippingInfo = "";

  let dropdown = document.getElementById("country");
  let button = document.getElementById("pay-button");

  init();

  async function init() {
    if (localStorage.getItem("cart") === null)  else {
      console.log("cart exists");
      
      button.setAttribute("disabled", true);

      let json = JSON.parse(localStorage.getItem("cart"));
      Array.from(json).forEach(cartItem => { subtotal = parseInt(subtotal) + parseInt(calculatePriceOfItem(cartItem)); } );
      document.getElementById("price-subtotal").textContent = subtotal.toString();

      await loadShippingData();
      shippingInfo.destinations.forEach(x => {
        dropdown.insertAdjacentHTML("beforeend", `<option value="${x.country}" data-cost="${x.cost}">${x.displayName}</option>`);
      });

      shippingCost = (shippingInfo.destinations[0].cost);
      shippingCost = (Math.round(shippingCost) / 100).toFixed(2);
      document.getElementById("price-shipping").textContent = shippingCost.toString();

      calculateTotalCost();

      setTimeout(, 5000);

      button.removeAttribute("disabled", false);
    }
  }

  dropdown.addEventListener("change", x => { calculateShippingCost(x) });

  function calculatePriceOfItem(x) {

    x.frameWidth = parseFloat(x.frameWidth);
    x.matWidth = parseFloat(x.matWidth);

    let price = 30.0;

    if(x.frameStyle == "classic") {
      price = price + x.frameWidth;
    } else if(x.frameStyle == "natural") {
      price = price + 0.8*x.frameWidth;
    } else if (x.frameStyle == "shabby") {
      price = price + 0.9*x.frameWidth;
    }

    price = price + 0.05*x.matWidth;

    if (x.printSize == "M") {
      price = price*2;
    } else if(x.printSize == "L")

    return (Math.round((price + Number.EPSILON) * 100) / 100).toFixed(2);
  }

  function calculateShippingCost(x) {
    shippingCost = (x.target.options[x.target.selectedIndex].dataset.cost);
    shippingCost = (Math.round(shippingCost) / 100).toFixed(2);

    document.getElementById("price-shipping").textContent = shippingCost.toString();

    calculateTotalCost();
  }
  function calculateTotalCost() {
    total = parseInt(shippingCost) + parseInt(subtotal);
    document.getElementById("price-total").textContent = total;
  }

  button.onclick = ;
  

  async function loadShippingData() {
    shippingInfo = await fetch("https://web-engineering.big.tuwien.ac.at/s20/a2/shipping").then( x => x.json() );
  }

