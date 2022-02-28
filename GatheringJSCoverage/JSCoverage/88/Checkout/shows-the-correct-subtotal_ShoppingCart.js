import CartItem from "./CartItem.js";

// -----------------------------------------------
// Class ShoppingCart
// used to interact with shopping cart
// get the current shoppingCart with Utils.getShoppingCart
// save the current shoppingCart with Utils.saveShoppingCart
// add items typeof CartItem.js to shopping cart with ShoppingCart.addItem
// remove a item from the cart with the objectID or by CartItem.js
// -----------------------------------------------
export default class ShoppingCart {
    // constructor
    // @param itemArray of type CartItem.js
    constructor(items) {
        this.items = items;
    }

    // get the sum of all item prices
    getSubTotal() {
        let subTotal = 0;
        let item;
        for (item of this.items) {
            subTotal += item.getPrice();
        }
        return subTotal;
    }

    // add item of type CartItem.js
    

    // remove cart item by CartItem.objectID
    

    // remove cart item by CartItem
    

    

    // get the number of Items in the Cart
    getSize() {
        if (this.items != null) {
            return this.items.length;
        }
    }
}