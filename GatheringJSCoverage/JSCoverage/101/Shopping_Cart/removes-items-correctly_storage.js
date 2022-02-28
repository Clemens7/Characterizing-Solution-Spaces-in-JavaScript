export function getCart() {
    return JSON.parse(window.localStorage.getItem('cart'));
}

export 

export function removeFromCart(objectID) {
    var cart = getCart();
    if (cart) {
        var removedItem;
        const index = cart.findIndex(object => object.objectID == objectID)
        if (index >= 0) {
            removedItem = cart.splice(index, 1);
        }
    }
    window.localStorage.setItem('cart', JSON.stringify(cart));
    return removedItem;
}

export 