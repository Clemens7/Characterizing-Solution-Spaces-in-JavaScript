class Cache {

    /**
     * @param key of the object to load from the localStorage
     * @returns a JSON object of the found object, or undefined when its not found
     */
    load = function (key) {
        if (key in localStorage) 
    }

    /**
     * @param key to store data at
     * @param data to store in localStorage
     */
    store = 

    /**
     * @param cartObject to store in the cart
     *                      example object: {
     *                            objectID: 39799,
     *                            printSize: "S",
     *                            frameStyle: "style",
     *                            frameWidth: 10,
     *                            matColor: "blue",
     *                            matWidth: 10
     *                      };
     */
    addToCart = 

    /**
     * @param objectID to remove from the cart
     */
    removeFromCart = 

    clearCart = 

    getCartItems = function () {
        const cart = this.load("cart");

        return cart  : [];
    }

    cartLength = 
}

export const cache = new Cache();