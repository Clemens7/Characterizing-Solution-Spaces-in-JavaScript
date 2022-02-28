import * as Frame from "./frame.js"

const objectsAPI = "https://collectionapi.metmuseum.org/public/collection/v1/objects/"
var totalPrice = 0;







async function createAllCartItems(){
    checkEmpty()

    let cart = JSON.parse(window.localStorage.getItem("cart"))

    for(let item in cart)

    document.getElementById("price-total").innerText = totalPrice;
    cartLinkCounter()
    document.getElementById("checkout-button").disabled = false;
}

function checkEmpty(){
    if(JSON.parse(window.localStorage.getItem("cart")).length == 0){
        document.getElementById("cart-empty").style.visibility = "visible"
        document.getElementById("checkout-button").disabled = true;

    }
}

function cartLinkCounter(){
    let numberOfItems = JSON.parse(window.localStorage.getItem("cart")).length
    if(numberOfItems == 0){
        document.getElementById("cart-link").innerText = `Cart`
    }

}

document.getElementById("checkout-button").disabled = true;
createAllCartItems()
