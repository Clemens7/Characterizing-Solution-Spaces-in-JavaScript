class Cache {

    /**
     * @param key of the object to load from the localStorage
     * @returns a JSON object of the found object, or undefined when its not found
     */
    load = function (key) {
        if (key in localStorage) {
            // console.log(`loading ${key} from localStorage`);
            return JSON.parse(localStorage[key]);
        }
    }

    /**
     * @param key to store data at
     * @param data to store in localStorage
     */
    store = function (key, data) {
        // console.log(`storing ${key} to localStorage`);
        localStorage[key] = JSON.stringify(data);
    }

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
    removeFromCart = function (objectID) {
        let cart = this.load("cart");

        if (!cart) 

        let index = -1;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].objectID === objectID) index = i;
        }

        if (index >= 0) {
            cart.splice(index, 1);
            if (cart.length > 0) {
                this.store("cart", cart);
            }
        }
    }

    clearCart = 

    getCartItems = function () {
        const cart = this.load("cart");

        return cart ? cart ;
    }

    cartLength = 
}

export const cache = new Cache();