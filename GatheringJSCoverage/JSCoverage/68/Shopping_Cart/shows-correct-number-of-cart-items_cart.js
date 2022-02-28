
const URL = 'https://collectionapi.metmuseum.org';
const GET_OBJECT_API = '/public/collection/v1/objects';
const CURRENT_URL = window.location.href;
const CONFIG_SIDE = "/config.html";
const CART_SIDE = "/cart.html"
let SERVER_URL;
let configobjectID = "";


const outerContainer = document.getElementsByClassName('cart-item');
const cartPreview = document.getElementsByClassName('cart-preview');
const imageView = document.getElementsByClassName('image-link');
const image = document.getElementsByClassName('cart-thumb');
const museumLabel = document.getElementsByClassName('museum-label');
const artist = document.getElementsByClassName('artist');
const title = document.getElementsByClassName('title');
const date = document.getElementsByClassName('date');
const frameDesc = document.getElementsByClassName('frame-description');
const cartPrice = document.getElementsByClassName('cart-price');
const itemPrice = document.getElementById('price-0');
const cartRemove = document.getElementsByClassName('cart-remove');

class Image {
    static HtmlNumber = 0;
    

    static 

    static 

    // create method from config, just for attribute info
    static 

    static generateHTMLCartTotal(){
        const cartTotal = document.createElement('div');
        cartTotal.className = 'cart-total';
        const totalPriceContainer = document.createElement('div');
        totalPriceContainer.className = 'price';
        totalPriceContainer.innerText = 'Total: € ';
        const totalPrice = document.createElement('span');
        totalPrice.id = 'price-total';
        totalPrice.innerText= '0';
        const checkoutButton = document.createElement('button');
        checkoutButton.className = 'checkout-button';
        checkoutButton.type = 'button';
        checkoutButton.id = 'checkout-button';
        checkoutButton.innerText = 'Checkout';
        checkoutButton.onclick = ;

        const shoppingCart = JSON.parse(localStorage.getItem('cart'));
        if(shoppingCart === null)

        let expectedTotal = 0;
        /*if(LSLength !== null){
            for (const item of LSLength) {
                expectedTotal += calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
            }
        } else {
            expectedTotal = 0;
        }*/
        totalPrice.innerHTML = expectedTotal;


        cartTotal.appendChild(totalPriceContainer);
        totalPriceContainer.appendChild(totalPrice);
        cartTotal.appendChild(checkoutButton);
        return cartTotal;
    }
}

//local storage
class Storage{
    static 

    static 

}

document.addEventListener("DOMContentLoaded",()=>{

    //let objectID = '';
    
    const urlParams = new URLSearchParams( window.location.search);

    /*if (urlParams.has('objectID')) {
        objectID = urlParams.get('objectID');
    }*/
    
    /*const cart = new Cart();

    //get all items
    cart.getItems().then(cart => {
        Storage.saveProducts(cart);
    });    */
});






















function init() {

    const shoppingCart = JSON.parse(localStorage.getItem('cart'));
    if(shoppingCart!==null && shoppingCart!== undefined && shoppingCart !== "") {
        const cartTotalItem = document.getElementById('cart-total-items');
        cartTotalItem.innerHTML = shoppingCart.length;


        let totalCont = Image.generateHTMLCartTotal();
        document.getElementById('cart').appendChild(totalCont);

        // reverse loop, since the last added object has to be on top
        for (let i = 0; i < shoppingCart.length; i++) 
    }
}

init();