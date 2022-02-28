/**
 * Saves an Object to the local storage
 *
 * @param cart the cart object which is going to be saved
 * @returns items
 */


function getLocalStorage(key) {
    var items = JSON.parse(localStorage.getItem(key) );
    return items;
}








