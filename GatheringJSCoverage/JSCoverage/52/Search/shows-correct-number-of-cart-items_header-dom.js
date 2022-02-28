

export class CartItemsContainer{
    constructor(){
        this.container = document.getElementById('cart-link');
        this.defaultValue = "Cart";
        this.refresh();
    }

    refresh(){
        if(!localStorage['cart'] || localStorage['cart'].length < 1 || localStorage['cart'] == '[]'){
            this.container.innertText = this.defaultValue;
            return;
        }}




}