import {calculatePrice} from "./frame.js";
import {render} from "./frame.js";
import {CartItem} from "./cartItem.js";
let items = [];
if (localStorage.getItem("cart") !== undefined && localStorage.getItem("cart") !== null) {
    items = JSON.parse(localStorage.getItem("cart"))
        .map(item => new CartItem(item.objectID, item.printSize, item.frameWidth, item.frameStyle, item.matWidth, item.matColor));
}
if (items.length === 0)  else {
    document.getElementById("cart-link").innerHTML = "Cart (" + items.length + ")";
}
checkEmpty();
buildCart();
let elements = document.getElementsByClassName("cart-remove");
Array.prototype.forEach.call(elements, element => {
    element.addEventListener("click", removeItem);
})
let images = document.getElementsByClassName("cart-thumb");
Array.prototype.forEach.call(images, element => {
    element.addEventListener("load", callRender);
})

/**
 * removes item from local storage and from current display
 */
function removeItem() {
    let index =Array.prototype.indexOf.call(getAncestor(this,3).children, getAncestor(this,2));
    items.splice(index,1);
    localStorage["cart"] = JSON.stringify(items);
    getAncestor(this,3).removeChild(getAncestor(this,2));
    setSum();
    checkEmpty();
    document.getElementById("cart-link").innerHTML = "Cart (" + items.length + ")";
}

/**
 * calculates sum of all items currently in the cart and displays it
 */
function setSum() {
    let sum = 0;
    items.forEach(item => sum += calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth));
    document.getElementById('price-total').innerHTML = sum.toFixed(2);
}

/**
 * for each cart item in the local storage it adds the html template to the original document, adjusts the price sum of
 * all items and loads the required data from cache or the art api
 */
function buildCart() {
    let template = "";
    items.forEach((item, index) => {
        template +=
            `
        <div class="cart-item">
            <div class="cart-preview" id=${"preview-container" + index}>
              <a href=${"config.html?" + item.toQueryParams()}>
                <img class="cart-thumb" style="max-height: 250px; max-width: 250px" id=${"preview" + index} alt="Image">
              </a>
            </div>
            <div class="museum-label">
              <div>
                <span class="artist" id=${"artist" + index}></span>
                <span class="title" id=${"title" + index}></span>
                <span class="date" id=${"date" + index}></span>
                <br><br>
                <span class="frame-description">${item.generateDesc()}</span>
              </div>
              <div class="cart-price">€
                <span id=${"price" + index}>
                    ${calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth).toFixed(2)}
                </span>
              </div>
              <button class="cart-remove" id="${index}"></button>
            </div>
        </div>
        `
    });
    setSum();
    document.getElementById('cart').insertAdjacentHTML('afterbegin', template);
    loadInfo(template);
}

/**
 * for each item in the cart, it checks wether the object is already in the cache. If it is not, the data is fetched and saved in the cache.
 * Then the data is inserted into the html
 * @param template in which the data shoud be inserted
 */
function loadInfo(template) {
    items.forEach((item, index) => {
        let cached = localStorage.getItem("object" + item.objectID);
        if (cached !== undefined && cached !==null)  else {
            fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects/" + item.objectID).then(response => {
                if (response.ok) {
                    response.json().then(json => {
                            localStorage.setItem("object" + item.objectID, JSON.stringify(json));
                            insertInfo(index, json.artistDisplayName, json.title, json.objectDate, json["primaryImageSmall"]);
                        }
                    )
                }
            });
        }
    });
}

function insertInfo(index, artist, title, date, preview) {
    document.getElementById("artist" + index).innerHTML = artist;
    let titleElement = document.getElementById("title" + index);
    if (date !== undefined && date !== null) {
        titleElement.innerHTML = title + ", ";
    }
    document.getElementById("date" + index).innerHTML = date;
    document.getElementById("preview" + index).src = preview;

}
function checkEmpty() {
    if (items.length === 0)  else {
        let button = document.getElementById("checkout-button");
        button.disabled = false;
        button.onclick = 
    }
}
function callRender() {
    let index = Array.prototype.indexOf.call(getAncestor(this,4).children, getAncestor(this,3));
    let item = items[index];
    render(this,this.parentElement,item.printSize, item.frameStyle, item.frameWidth, item.matColor, item.matWidth)
}
function getAncestor(child,level) {
    let ancestor = child;
    for (let i = 0; i < level ; i++) {
        ancestor = ancestor.parentElement;
    } return ancestor;
}
