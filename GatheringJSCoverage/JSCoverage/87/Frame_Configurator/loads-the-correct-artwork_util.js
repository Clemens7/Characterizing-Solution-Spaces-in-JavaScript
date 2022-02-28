import * as Model from './models.js';

export function getOrDefault(queryParam, name, defaultValue=null){
    if(queryParam.has(name))  else {
        return defaultValue;
    }
}

export function setRadioButtonByValue(radioButtons, value) {
    //convert to js array and then check if the value is present
    if(Array.prototype.slice.call(radioButtons).some( btn => btn.value == value)) {
        //the value can be set!
        radioButtons.forEach(btn => {
            if(btn.value == value) {
                btn.setAttribute("checked", "")
            } else {
                btn.removeAttribute("checked")
            }
        });
    }

}

export 

export 

export function showCartNumber() {
    const cart = Model.retrieveCart();
    const cartNum = cart.items.length;
    const cartLink = document.getElementById("cart-link");
    if(cartNum <= 0) {
        cartLink.innerText = "Cart";
    }
    console.log(cart.items.length);

    
}


export 