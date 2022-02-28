

export class CartItemsContainer{
    constructor(){
        this.container = document.getElementById('cart-link');
        this.defaultValue = "Cart";
        this.refresh();
    }

    refresh(){
        if(!localStorage['cart'] || localStorage['cart'].length < 1 || localStorage['cart'] == '[]')

        const storedObjects = JSON.parse(localStorage['cart']);
        this.container.innerText = `Cart (${storedObjects.length})`;
    }




}