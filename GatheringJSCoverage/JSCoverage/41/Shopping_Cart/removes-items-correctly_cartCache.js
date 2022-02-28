/*
 * returns an array of the items in the shopping cart
 */
export function retrieveAll() {
    console.log(`Retrieving all cart objects from local storage`);
    const key = "cart";

    if(key in localStorage) {
        return JSON.parse(localStorage[key]);
    }
}

/*
 * All cart items are stored in the localstorage under the key "cart" in an array
 * e.g. {"cart": "[item1, item2, item3]"}
 * an item can look like:
 * {
 *   "objectID":"1",
 *   "printSize":"22",
 *   "frameStyle":"style1",
 *   "frameWidth":"5",
 *   "matColor":"blue",
 *   "matWidth":"3"
 * }
 */
export 


export function deleteObj(i) {
    console.log(`Delete cart object in local storage with index ${i}`);
    const key = "cart";

    let a = JSON.parse(localStorage[key]);
    // remove elem from array
    console.log(i);
    a.splice(i, 1);

    localStorage[key] = JSON.stringify(a);


}
