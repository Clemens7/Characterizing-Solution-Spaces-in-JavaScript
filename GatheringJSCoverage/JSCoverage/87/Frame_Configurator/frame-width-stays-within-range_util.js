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

export function getActiveRadioValue(radioButtons){
    return Array.prototype.slice.call(radioButtons).find( btn => btn.hasAttribute("checked")).value;
}

export function validateAndResetSliderAndTextInputForRange(slider, textInput){

    if(Number(slider.value) < Number(slider.min) || Number(textInput.value) < Number(slider.min)) {
        console.log("slider or textField was set below min. resetting to min.")
        slider.value = slider.min;
        textInput.value = slider.min;
    }

    if(Number(slider.value) > Number(slider.max) || Number(textInput.value) > Number(slider.max)) {
        console.log("slider or textField was set above max. resetting to max.")
        slider.value = slider.max;
        textInput.value = slider.max;
    }
}

export function showCartNumber() {
    const cart = Model.retrieveCart();
    const cartNum = cart.items.length;
    const cartLink = document.getElementById("cart-link");
    if(cartNum <= 0) {
        cartLink.innerText = "Cart";
    }
    console.log(cart.items.length);

    
}


export function round(value, precision) {
    var multiplier = Math.pow(10, precision );
    return Math.round(value * multiplier) / multiplier;
}