import {calculatePriceFromItem, render} from "./frame.js";
import {retrieve} from "./metrequests.js";

let items = JSON.parse(localStorage.getItem("cart"));
const sizeNames = {'L': 'Large', 'M': 'Medium', 'S': 'Small'};

window.onload = populateCartHtml();

function populateCartHtml() {
    if (items === null) 
    for (let i = 0; i < items.length; i++) {
        let el = createCartItemElement(i);
        document.getElementById("cart")
            .insertBefore(el, document.getElementsByClassName("cart-total")[0]);
    }
    update();
}



function setTotal() {
    let total = 0;
    let cartItems = document.getElementsByClassName("cart-item");
    for (let i = 0; i < cartItems.length; i++) {
        total += calculatePriceFromItem(items[i]);
    }
    document.getElementById("price-total").innerHTML = "" + total;
}

function setItemsInCart() {
    document.getElementById("cart-link").innerHTML = `Cart (${items.length})`
}

function update() {
    if (items.length === 0) 
    setTotal();
    setItemsInCart();
}



function createCartItemElement(id) {
    let el = document.createElement('div');
    el.setAttribute("class", "cart-item");
    let item = items[id];
    let preview = document.createElement('div');
    preview.setAttribute("class", "cart-preview");
    preview.setAttribute("id", "preview-container-" + id);
    let mlabel = document.createElement('div');
    mlabel.setAttribute("class", "museum-label");
    el.append(preview);
    el.append(mlabel);
    retrieve(item.objectID)
        .then((data) => {
            console.log(data);
            setLabel(id, data, mlabel);
            setPreview(id, data, preview);
        });
    return el;
}

function getRmButton(id, el) {
    let rm = document.createElement("button");
    rm.setAttribute("class", "cart-remove");
    let f = ;
    rm.addEventListener("click", f);
    return rm;
}

function setLabel(id, met, mlabel) {
    let price = calculatePriceFromItem(items[id]);
    let description = getDescription(items[id]);
    mlabel.innerHTML = `<div>
                    <span class="artist">${met.artistDisplayName}</span>
                    <span class="title">${met.title}</span>,
                    <span class="date">${met.objectDate}</span>
                    <br><br>
                    <span class="frame-description">${description}</span>
                </div>
                <div class="cart-price">€ <span id="price-${id}">${price}</span></div>`;
    mlabel.append(getRmButton(id, mlabel.parentElement));
}

function setPreview(id, met, preview) {
    let item = items[id];
    let link = `./config.html?objectID=${item.objectID}&printSize=${item.printSize}&frameWidth=${item.frameWidth}&frameStyle=${item.frameStyle}&matWidth=${item.matWidth}&matColor=${item.matColor}`;
    let a = document.createElement("a");
    a.href = link;
    preview.append(a);
    let img = document.createElement("img");
    img.src = met.primaryImageSmall;
    img.addEventListener("load", function() {render(img, preview, item.printSize, item.frameStyle, item.frameWidth, item.matColor, item.matWidth)})
    a.append(img);
    return preview;
}



function getDescription(item) {
    let size = sizeNames[item.printSize];
    let mat = item.matWidth === 0  : ` with a ${item.matWidth / 10} cm ${item.matColor} mat`;
    return `${size} print in a ${item.frameWidth / 10} cm ${item.frameStyle} frame${mat}.`;
}