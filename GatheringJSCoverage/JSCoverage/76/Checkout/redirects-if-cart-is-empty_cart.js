import {calculatePriceFromItem, render} from "./frame.js";
import {retrieve} from "./metrequests.js";

let items = JSON.parse(localStorage.getItem("cart"));
const sizeNames = {'L': 'Large', 'M': 'Medium', 'S': 'Small'};

window.onload = populateCartHtml();

function populateCartHtml() {
    if (items === null) {
        empty();
        return;
    }}

function empty() {
    document.getElementById("price-total").innerHTML = "0";
    let empty = document.createElement("div");
    empty.innerHTML = 'There are no items in your shopping cart.<br>';
    document.getElementById("cart").insertBefore(empty, document.getElementsByClassName("cart-total")[0]);
    document.getElementById("checkout-button").disabled = true;
}



















