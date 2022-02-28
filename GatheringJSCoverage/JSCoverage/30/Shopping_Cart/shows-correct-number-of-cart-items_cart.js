

import { render, calculatePrice } from "./frame.js"




const fetchImage = 

 /* let cartObjects = [
    {
        "objectID": 39799,
        "frameStyle": "classic",
        "frameWidth": 35,
        "printSize": "S",
        "matColor": "coal",
        "matWidth": 13
    },
    {
        "objectID": 459055,
        "frameStyle": "natural",
        "frameWidth": 43,
        "printSize": "M",
        "matColor": "indigo",
        "matWidth": 43
    },
    {
        "objectID": 437853,
        "frameStyle": "shabby",
        "frameWidth": 32,
        "printSize":"L",
        "matColor": "mint",
        "matWidth": 33
    },
    {
        "objectID": 435809,
        "frameStyle": "elegant",
        "frameWidth": 48,
        "printSize":"S",
        "matColor": "ivory",
        "matWidth": 0
    }
] */

function retrieve(searchName) {
    const key = searchName;
    if(key in localStorage) {
        console.log(`Retrieving ${key} from local storage`);        
        return JSON.parse(localStorage[key]);
    }
}
let cart1= retrieve('cart');
if(cart1 !== undefined){
 cart1.reverse();
}


const getArtworks = async (array) => {
    const mappedData = array.map()
    console.log(mappedData);
    return Promise.all(mappedData)
}


getArtworks(cart1).then(artWorks => {
    console.log(artWorks);
    artWorks.forEach()
    let quantity = artWorks.length;
let cartLink = document.getElementById("cart-link");


//adds number of cart objects to navbar
function cartItems(quantity){
    if (quantity > 0) else{
        cartLink.innerHTML = 'Cart';
    }
}
displayCart(artWorks, quantity);
//display items from cart
function displayCart(artWorks, quantity){
    document.getElementById('cart').innerHTML = '';
    if(quantity)else{
        cartItems(quantity);
        let divNoItems = document.createElement('div');
        divNoItems.id = 'no-items';
        divNoItems.innerHTML = 'There are no items in your shopping cart.';
        document.getElementById('cart').appendChild(divNoItems);
        buttonCheckout(quantity);
    }
}









function buttonCheckout(quantity) {
    //if true, sonst disable
    
    let buttonCheckout = document.createElement('button');
    buttonCheckout.type = 'button';
    buttonCheckout.id = 'checkout-button';
    buttonCheckout.setAttribute("onclick","location.href='checkout.html'");
    buttonCheckout.innerHTML = 'Checkout';
    if (quantity)else{
        buttonCheckout.disabled = true;
        document.getElementById('cart').appendChild(buttonCheckout);
    }

}
//


//






































})
