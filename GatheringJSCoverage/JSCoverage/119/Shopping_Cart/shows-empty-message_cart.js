import { getPrintSizes, render, calculatePrice } from "./frame.js";

var configContent = localStorage.getItem("cart");
var configContentJSON = JSON.parse(configContent);
const image = document.getElementById("preview-0");
const container = document.getElementById("preview-container-0");
const label = document.getElementById("museum-label-0");
console.log(configContentJSON);
const btn = document.querySelector("button.cart-remove");
var priceSum = 0;
console.log(btn);



document.addEventListener('DOMContentLoaded', (event) => {
    /*
    console.log("TEST");
    console.log("ObjID: " + configContentJSON.objectID);
    console.log("PrintSize: " + configContentJSON.printSize);
    console.log("FrameStyle: " + configContentJSON.frameStyle);
    console.log("FrameWidth: " + configContentJSON.frameWidth);
    console.log("MatColor: " + configContentJSON.matColor);
    console.log("MatWidth: " + configContentJSON.matWidth);
    */
    if(configContentJSON != null)  else {
        var main = document.querySelector("main");
        main.innerHTML = `<span><strong>There are no items in your shopping cart.</span>`
    }
    
    
});



