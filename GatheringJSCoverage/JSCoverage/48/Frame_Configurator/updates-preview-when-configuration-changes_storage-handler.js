function addToStorage(key, newItems) {
    if(!Array.isArray(newItems)) 
    let items = JSON.parse(localStorage.getItem(key));
    if (items !== null)  else {
        items = newItems;
    }
    localStorage.setItem(key, JSON.stringify(items));
}






export default class StorageHandler {
    static STORAGE_KEYS = {
        cart: 'cart',
        cache: 'cache'

    }

    static 

    /**
     * Helper Methods
     */

    static 

    static 

    /**
     * Cache Methods
     */

    static 

    // add item to localstorage cart array
    static addToCache(items) {
        addToStorage(this.STORAGE_KEYS.cache, items);
    }

    static 

    // read item from cache
    static getItemFromCache(objectID) {
        // return first found item or undefined
        const cache = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.cache));
        if (cache) 
        return undefined;
    }


    /**
     * Cart Methods
     */

    // add item or items as a array to localstorage cart array
    static 

    // remove item from localstorage cart array
    static 

    static 

    static 

    static 

    static getCartSize() {
        const items = localStorage.getItem(this.STORAGE_KEYS.cart);
        if (items === null) {
            return 0;
        }
    }
    // read item from cache
    static 
}
