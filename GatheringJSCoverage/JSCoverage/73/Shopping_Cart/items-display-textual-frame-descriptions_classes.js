class CartItem {
    constructor(objectID, printSize, frameStyle, frameWidth, matColor, matWidth) {
        this.objectID = objectID;
        this.printSize = printSize;
        this.frameStyle = frameStyle;
        this.frameWidth = frameWidth;
        this.matColor = matColor;
        this.matWidth = matWidth;
    }
}
export { CartItem };
class ShoppingCart {
    constructor() {
        this.loadShoppingCart();
    }
    loadShoppingCart() {
        const cartItemsInStorage = JSON.parse(localStorage.getItem('cart'));
        if (cartItemsInStorage) {
            this.cartItems = cartItemsInStorage.map(cartItem => new CartItem(cartItem.objectID, cartItem.printSize, cartItem.frameStyle, cartItem.frameWidth, cartItem.matColor, cartItem.matWidth));
        }
        // console.log(this.cartItems);
    }
    
    setShoppingCartLinkValue() {
        let cartLink = document.getElementById("cart-link");
        if (this.cartItems && this.cartItems.length > 0) {
            cartLink.innerHTML = "Cart (" + this.cartItems.length + ")";
        }
    }
}
export { ShoppingCart };
