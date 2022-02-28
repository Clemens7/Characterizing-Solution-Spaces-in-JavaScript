import * as Frame from "./frame.js";

var subTotal = "&mdash;";
var shippingCost = "&mdash;";
var total = "&mdash;";
var shippingInfo;
var cart = JSON.parse(localStorage.getItem("cart"));

window.onload = onPageLoad();

function onPageLoad(){
    subTotalCalculation();
    redirect();
    getShippingInfo();
}

function getShippingInfo(){
    shippingInfo = fetch('https://web-engineering.big.tuwien.ac.at/s20/a2/shipping')
        .then(response => response.json())
        .then(function (data) {
            shippingInfo = data;
            for (var key in shippingInfo.destinations) {
                var option = document.createElement("option");
                option.text = shippingInfo.destinations[key].displayName;
                option.value = shippingInfo.destinations[key].country;
                document.getElementById("country").add(option);
            }
            calculateShippingCost(shippingInfo.destinations[0].cost);
            document.getElementById("price-shipping").innerHTML = shippingCost;
            calculateTotal();
            document.getElementById("price-total").innerHTML = total;
            payButton();
        });
}

function calculateTotal(){
    if (subTotal === "&mdash;" || shippingCost === "&mdash;") else {
        total = parseFloat(subTotal) + parseFloat(shippingCost);
    }
}

function calculateShippingCost(cost){
    shippingCost = (cost/100).toFixed(2);
}

function subTotalCalculation(){
    //calculate the subTotal from cart
    subTotal = 0;
    for (var key in cart) {
        subTotal += parseFloat(Frame.calculatePrice(cart[key].printSize, cart[key].frameStyle, cart[key].frameWidth, cart[key].matWidth))
    }

    document.getElementById("price-subtotal").innerHTML = subTotal;
}

function redirect(){

        //this if statement checks whether the cart item is defined, if no, then it redirects to cart page
        if (JSON.parse(localStorage.getItem("cart")) == null) 
}

document.getElementById("country").onchange = function() {
    var selection = document.getElementById("country").value;
    for (var key in shippingInfo.destinations) {
        if (selection===shippingInfo.destinations[key].country){
            calculateShippingCost(shippingInfo.destinations[key].cost);
            document.getElementById("price-shipping").innerHTML=shippingCost;
        }

    }
    calculateTotal();
    document.getElementById("price-total").innerHTML = total;
    payButton();
}


function payButton(){
    if(subTotal === "&mdash;" || shippingCost === "&mdash;")
}