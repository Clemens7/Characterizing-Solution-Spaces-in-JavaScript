import API from './APIRequests.js'
import * as Frame from './frame.js';
import ShoppingCart from './ShoppingCart.js'

class Loader {
    constructor () {
        this.cart = new ShoppingCart()
        this.cart.updateHeader()
        
        const ids = this.cart.getIDs()
        if (ids && ids.length)  else {
            let text = document.createElement("p")
            text.innerHTML = 'There are no items in your shopping cart.'
            //document.getElementById("cart").appendChild(text)
            let button = this.createButton()
            button.disabled = true
            let cart = document.getElementById("cart")
            cart.appendChild(text)
            cart.appendChild(button)

        }

    }

    

    createButton() {
        var b = document.createElement("button")
        b.setAttribute("id", "checkout-button")
        b.innerHTML = 'Checkout'

        return b

    }

    

    

    

}


class CartItem {

    

    

    

    
    
}
new Loader();