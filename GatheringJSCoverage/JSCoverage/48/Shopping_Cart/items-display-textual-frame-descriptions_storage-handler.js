function addToStorage(key, newItems) {
    if(!Array.isArray(newItems)) {
        newItems = [newItems];
    }
    let items = JSON.parse(localStorage.getItem(key));
    if (items !== null) {
        newItems.forEach(newItem => {
            if (key === StorageHandler.STORAGE_KEYS.cache) {
                if (items.filter(item => newItem.objectID === item.objectID).length === 0) {
                    items.push(newItem);
                }
            }
        });
    } else {
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
        if (cache) {
            //return JSON.parse(localStorage.getItem(this.STORAGE_KEYS.cache)).filter(item => item.objectID === objectID)[0];
            for (let i = 0; i < cache.length; i++) {
                let item = cache[i];
                if (item["objectID"] == objectID) 
            }
        }
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

    static readCart() {
        const items = localStorage.getItem(this.STORAGE_KEYS.cart);
        if (items === null)  else {
            return JSON.parse(localStorage.getItem(this.STORAGE_KEYS.cart));
        }
    }

    static 

    static getCartSize() {
        const items = localStorage.getItem(this.STORAGE_KEYS.cart);
        if (items === null)  else {
            return JSON.parse(localStorage.getItem(this.STORAGE_KEYS.cart)).length;
        }
    }
    // read item from cache
    static 
}
