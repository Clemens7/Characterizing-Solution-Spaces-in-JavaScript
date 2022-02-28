class CartItem {
    
}
export { CartItem };
class ShoppingCart {
    constructor() {
        this.loadShoppingCart();
    }
    loadShoppingCart() {
        const cartItemsInStorage = JSON.parse(localStorage.getItem('cart'));
        if (cartItemsInStorage) {
            this.cartItems = cartItemsInStorage.map();
        }
        // console.log(this.cartItems);
    }
    
    setShoppingCartLinkValue() {
        let cartLink = document.getElementById("cart-link");
        if (this.cartItems && this.cartItems.length > 0) 
        else {
            cartLink.innerHTML = "Cart";
        }
    }
}
export { ShoppingCart };
