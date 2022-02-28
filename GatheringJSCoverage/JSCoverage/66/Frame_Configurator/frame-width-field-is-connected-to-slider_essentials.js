/**
 * Saves an Object to the local storage
 *
 * @param cart the cart object which is going to be saved
 * @returns items
 */


function getLocalStorage(key) {
    var items = JSON.parse(localStorage.getItem(key) || "[]");
    return items;
}


function httpGetById(url, id)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url + id, false); // true for asynchronous
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.response);
}





