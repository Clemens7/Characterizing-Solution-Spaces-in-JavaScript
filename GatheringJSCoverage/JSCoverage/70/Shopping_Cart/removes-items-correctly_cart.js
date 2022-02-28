import * as Cache from './cache.js';
import * as DOM from './artmart-dom.js';




const exampleCart = [{
    "objectID": 39799,
    "frameStyle": "natural",
    "printSize": 'M',
    "frameWidth": 45,
    "matColor": "mint",
    "matWidth": 50
    
}, {
    "objectID": 459055,
    "frameStyle": "shabby",
    "printSize": 'S',
    "frameWidth": 50,
    "matColor": "indigo",
    "matWidth": 0
    
}]

//***set cart for testing
//localStorage.setItem('cart', JSON.stringify(exampleCart));

function updateView() {
    generatePreview(Cache.getCart());
    updateTotalPrice();
    document.getElementById("cart-link").innerHTML = Cache.generateCartString();
}

function removeFromCart(index) {
    let cart = Cache.getCart();
    // if (cart.length == (index + 1)){
    //     cart.pop();
    //     console.log("Updated cart = " + JSON.stringify(cart));
    //     Cache.storeCart(cart);
    // } else {
        cart.splice(index, 1);
        console.log("Updated cart = " + JSON.stringify(cart));
        Cache.storeCart(cart);
   // }
    
}


function generatePreview(cart) {
    let container = document.getElementById("cart");
    container.innerHTML = '';
    console.log(`Cart = ${JSON.stringify(cart)}`);

    if (!cart)  else {
        for (let index in cart) {
            const cartObject = cart[index];

            Cache.getObjectData(cartObject.objectID).then(res => {
                let itemNode = DOM.generateCartItem(index, res, cartObject, container);

                itemNode.getElementsByClassName('cart-remove')[0].addEventListener('click', function () {
                    removeItem(index);
                    // location.reload();
                });

            });
        }
    }
}

function removeItem(index) {
    console.log(`Removing cart object with index ${index}`);
    let toRemove = document.getElementById(`preview-container-${index}`).parentNode;
    document.getElementById('cart').removeChild(toRemove);
    removeFromCart(index);

    if (Cache.getCart() == null) 

    updateView();
}

function updateTotalPrice() {
    document.getElementById('price-total').innerText = Cache.calculateTotalCartPrice().toFixed(2);
}

 
updateView();