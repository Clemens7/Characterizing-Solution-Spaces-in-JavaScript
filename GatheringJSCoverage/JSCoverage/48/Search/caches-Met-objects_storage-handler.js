






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
    static 

    static 

    // read item from cache
    static getItemFromCache(objectID) {
        // return first found item or undefined
        const cache = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.cache));
        if (cache) {
            //return JSON.parse(localStorage.getItem(this.STORAGE_KEYS.cache)).filter(item => item.objectID === objectID)[0];
            for (let i = 0; i < cache.length; i++) {
                let item = cache[i];
                if (item["objectID"] == objectID) {
                    return item;
                }
            }}


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
