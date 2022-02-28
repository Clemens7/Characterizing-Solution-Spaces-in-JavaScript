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




function generatePreview(cart) {
    let container = document.getElementById("cart");
    container.innerHTML = '';
    console.log(`Cart = ${JSON.stringify(cart)}`);

    if (!cart) {

        DOM.showEmptyCart(container);
    }
}



function updateTotalPrice() {
    document.getElementById('price-total').innerText = Cache.calculateTotalCartPrice().toFixed(2);
}

 
updateView();