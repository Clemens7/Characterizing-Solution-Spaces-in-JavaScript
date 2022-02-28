import * as Frame from "./frame.js"

const objectsAPI = "https://collectionapi.metmuseum.org/public/collection/v1/objects/"
var totalPrice = 0;







async function createAllCartItems(){
    checkEmpty()

    let cart = JSON.parse(window.localStorage.getItem("cart"))

    for(let item in cart)}

function checkEmpty(){
    if(JSON.parse(window.localStorage.getItem("cart")).length == 0)
}



document.getElementById("checkout-button").disabled = true;
createAllCartItems()
