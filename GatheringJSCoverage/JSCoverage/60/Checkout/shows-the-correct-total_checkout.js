import { calculatePrice } from './frame.js';

async function changeShipping(){
  try{
    var country = document.getElementById("country").value;
    let shippingCost;
    let sList = await shippingList;
    if(country===""){country = sList.destinations[0].country;}
    for(let s of sList.destinations){
      if(s.country == country){
        shippingCost=(s.cost/100);
      }
    }
    document.getElementById("price-shipping").innerHTML=(shippingCost).toFixed(2);
    document.getElementById("price-total").innerHTML=(shippingCost+parseFloat(document.getElementById("price-subtotal").innerHTML)).toFixed(2);
    document.getElementById("pay-button").disabled = false;
  }

}

async function loadShippingList(){
  try{
    let response = await fetch('https://web-engineering.big.tuwien.ac.at/s20/a2/shipping');
    return await response.json();
  }}

function setSubTotal(){
  let subtotalPrice=0.0;
  try{
    for(let p of cart){
      subtotalPrice+=calculatePrice(p.printSize, p.frameStyle, p.frameWidth, p.matWidth);
    }
    document.getElementById("price-subtotal").innerHTML=(subtotalPrice).toFixed(2);
  }
}

async function loadValues(){
  let text = '';
  document.getElementById("pay-button").disabled = true;
  setSubTotal();
  try{
    let sList = await shippingList;
    for(let s of sList.destinations){
      text+='<option value="'+s.country+'">'+s.displayName+'</option>\n';
    }
    document.getElementById("pay-button").disabled = false;
    changeShipping();
  }
  document.getElementById("country").innerHTML += text;
}

function init(){
  /*var pict = [];
  pict[0] = {
    objectID: 0,
    printSize: 'S',
    frameStyle: 'classic',
    frameWidth: 100,
    matColor: 'red',
    matWidth: 100
  };
  window.localStorage.setItem("cart", JSON.stringify(pict));*/

  try{
    cart = JSON.parse(window.localStorage.getItem("cart"));
    if(cart.length===0||cart===null)
  }


  loadValues();

}

var shippingList = loadShippingList();
var cart;

window.onload = init();

document.getElementById("country").addEventListener("change", (event)=>{changeShipping();});
