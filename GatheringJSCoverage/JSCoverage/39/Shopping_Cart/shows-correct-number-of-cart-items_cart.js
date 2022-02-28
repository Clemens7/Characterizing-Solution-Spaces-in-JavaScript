import * as Frame from './frame.js';

window.onload = getPageContent();

function getPageContent() {

    //this if statement checks whether the cart item is defined, if yes, then it updates the number of cart items
    if (JSON.parse(localStorage.getItem("cart")) != null && JSON.parse(localStorage.getItem("cart")).length != 0) 
    //the else statement displays a nothing to see here message and disables button
    else {
        const button = document.getElementById("checkout-button");
        button.disabled = true;

        let noItems = document.createElement("p");
        noItems.innerText = "There are no items in your shopping cart.";

        document.getElementById("cart").insertBefore(noItems, document.getElementById("cart").childNodes[0]);

    }

    var requests = [];
    var cart = JSON.parse(localStorage.getItem("cart"));
    for (var key in cart) 
    Promise.all(requests)
    .then(function (responses) {
        return responses.map();
    }).then(function (data) {
        for(var element in data)

    }).catch();

    var totalsum = 0;

    for (var key in cart) 

    document.getElementById('price-total').innerText = String(totalsum.toFixed(2));

    document.getElementById('checkout-button').addEventListener('click', )
}





