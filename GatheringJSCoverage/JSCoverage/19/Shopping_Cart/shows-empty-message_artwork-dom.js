import {getPrintSizes, render, calculatePrice} from "./frame.js";

export class ResultContainer {
    

    

    
}

export class ConfigImage{

    

    

    
}

export class DisplayCart {
    constructor() {
        this.displayCart = document.getElementById("cart")
    }

    clear() {
        this.displayCart.innerHTML = "";
    }

    

    addTotalPrice(cartEmpty) {
        const totalPriceContainer = document.createElement('div');
        totalPriceContainer.classList.add("cart-total");

        const totalPriceText = document.createElement('div');
        totalPriceText.classList.add("price");
        totalPriceText.innerText = "Total: € ";

        const totalPrice = document.createElement('span');
        totalPrice.id = "price-total";
        totalPrice.innerText = 0;

        const checkoutButton = document.createElement('button');
        checkoutButton.type = "button";
        checkoutButton.id = "checkout-button";
        checkoutButton.innerText = "Checkout";
        if (cartEmpty) {
            checkoutButton.disabled = true;

            const noItems = document.createElement('h2');
            noItems.innerText = "There are no items in your shopping cart.";

            this.displayCart.appendChild(noItems);
        }

        totalPriceText.appendChild(totalPrice);
        totalPriceContainer.appendChild(totalPriceText);
        totalPriceContainer.appendChild(checkoutButton);

        this.displayCart.appendChild(totalPriceContainer);

        document.getElementById('checkout-button').addEventListener("click", );
    }
}





