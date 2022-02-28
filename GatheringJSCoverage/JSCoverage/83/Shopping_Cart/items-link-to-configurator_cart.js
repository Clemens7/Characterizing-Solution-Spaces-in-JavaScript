import * as FrameMethods from './frame.js';

let configList = JSON.parse(localStorage.getItem('cart'));
var imgList = []; //list of json object form api
let price_total = 0;
var checkoutActive;
const API_BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";



async function getData() {
    console.log("load data");
    let configList = JSON.parse(localStorage.getItem('cart'));
    if (configList == null || configList.length === 0)  else {
        checkoutActive = true;
        for (let i = 0; i < configList.length; ++i) {
            let data;
            let objectID = configList[i].objectID;
            try {
                if (localStorage.getItem(objectID) == null) {
                    const url = API_BASE_URL + objectID;
                    let response = await fetch(url);
                    data = await response.json();
                    localStorage.setItem(objectID, data);

                    console.log(data);
                    imgList.push(data);
                    displayElement(data, i);
                }
            } 
        }
    }
    addCartTotal('cart', "div", "cart-total");
}

function addCartTotal(parentID, elementTag, itemClass) {
    let cart = document.getElementById(parentID);
    if (cart === null) 

    let cart_total = document.createElement(elementTag);
    cart_total.setAttribute('class', itemClass);

    let price_div = document.createElement('div');
    price_div.setAttribute("class", "price");
    price_div.innerText = "Total: €";

    let total_price = document.createElement('span');
    total_price.setAttribute("id", "price-total");
    total_price.innerText = "" + price_total;
    price_div.append(total_price);

    let checkout_anchor = document.createElement("a");
    checkout_anchor.setAttribute("href", "checkout.html");
    //checkout_anchor.setAttribute("onclick", "return maybeEnableCheckout)");

    let checkout_btn = document.createElement("button");
    checkout_btn.setAttribute("type", "button");
    checkout_btn.setAttribute("id", "checkout-button");
    checkout_btn.setAttribute("disabled", maybeEnableCheckout);
    checkout_btn.innerText = "Checkout";
    checkout_anchor.append(checkout_btn);

    cart_total.append(price_div);
    cart_total.append(checkout_anchor);
    cart.append(cart_total);
}

window.onload = function () {
    getData();
}

window.displayElement = displayElement;

function displayElement(data, curr_index) {
    const cartID = "cart";
    if (data != null) {
        addCartItem(cartID, "div", "cart-item-" + curr_index, data, curr_index);
        console.log("added item with id: " + data.objectID);
    }
}

function resolveConfig(data_id) {
    var toReturn;
    for (let i = 0; i < configList.length; ++i) {
        try {
            var curr_object = configList[i];
            var objectIDList = curr_object.objectID;
            if (data_id == objectIDList) {
                toReturn = curr_object;
                break;
            }
        } 
    }
    return toReturn;
}

function addCartPreview(parentId, elementTag, itemID, data) {
    let cart_item = document.getElementById(parentId);
    if (cart_item === null) 
    let cart_preview = document.createElement(elementTag);
    cart_preview.setAttribute('class', "cart-preview");
    cart_preview.setAttribute('id', itemID);

    let image = data.primaryImage;
    if (image === undefined) image = data.primaryImageSmall;
    if (image === undefined) 

    let image_link = document.createElement('a');
    let base_url;
    console.log(location.host);
    if (location.host == "localhost:63342") 
    if(location.host == "localhost:4444" ) base_url = 'http://localhost:4444/config.html';

    let config_url = new URL(base_url);
    let curr_config = resolveConfig(data.objectID);

    config_url.searchParams.set('objectID', curr_config.objectID);
    config_url.searchParams.set('printSize', curr_config.printSize);
    config_url.searchParams.set('frameStyle', curr_config.frameStyle);
    config_url.searchParams.set('frameWidth', curr_config.frameWidth);
    config_url.searchParams.set('matColor', curr_config.matColor);
    config_url.searchParams.set('matWidth', curr_config.matWidth);
    image_link.setAttribute('href', config_url.toString());
    let img = document.createElement("img");
    img.setAttribute("class", "cart-thumb");
    img.setAttribute("src", image);


    image_link.append(img);
    cart_preview.append(image_link);
    cart_item.append(cart_preview);

    console.log("start rendering img " + data.objectID);
    console.log([curr_config.printSize, curr_config.frameStyle, curr_config.frameWidth, curr_config.matColor, curr_config.matWidth]);
    FrameMethods.render(img, cart_preview, curr_config.printSize, curr_config.frameStyle, curr_config.frameWidth, curr_config.matColor, curr_config.matWidth);
    console.log("finished rendering");
}

function resolveDescription(objectID) {
    var description = "No description available.";
    for (let i = 0; i < configList.length; ++i) {
        try {
            var curr_object = configList[i];
            var objectIDList = curr_object.objectID;
            if (objectID == objectIDList) {
                let matWidthString = "";
                if (!(curr_object.matWidth === 0 || curr_object.matWidth == 0)) matWidthString = " with a " + curr_object.matWidth / 10 + " cm " + curr_object.matColor.toLowerCase() + " mat";
                description = resolvePrintSize(curr_object.printSize) + " print in a " + curr_object.frameWidth / 10 + " cm " + curr_object.frameStyle.toLowerCase() + " frame" + matWidthString + ".";
                break;
            }
        } 
    }
    return description;
}

function resolvePrintSize(printString) {
    if (printString === "S") return "Small";
    if (printString === "M") return "Medium";
    if (printString === "L") return "Large";}

function addMuseumLabel(parentId, elementTag, itemID, data, curr_index) {
    let cart_item = document.getElementById(parentId);
    if (cart_item === null) 

    let museum_label = document.createElement(elementTag);
    museum_label.setAttribute('class', "museum-label");
    museum_label.setAttribute('id', itemID);

    let curr_object = configList[curr_index];
    let printSize = curr_object.printSize;
    let frameStyle = curr_object.frameStyle;
    let frameWidth = curr_object.frameWidth;
    let matWidth = curr_object.matWidth;
    let price = FrameMethods.calculatePrice(printSize, frameStyle, frameWidth, matWidth);
    price_total += price;
    let priceID = "price-" + curr_index;

    let artist_elem = document.createElement('span');
    artist_elem.setAttribute("class", "artist");
    artist_elem.innerText = data.artistDisplayName;
    museum_label.append(artist_elem);

    let title_elem = document.createElement("span");
    title_elem.setAttribute("class", "title");
    title_elem.innerText = data.title + ", ";
    museum_label.append(title_elem);

    let date_elem = document.createElement('span');
    date_elem.setAttribute("class", "date");
    date_elem.innerText = data.objectDate;
    museum_label.append(date_elem);
    museum_label.innerHTML += "<br><br>";

    let frame_description_elem = document.createElement("span");
    frame_description_elem.setAttribute("class", "frame-description");
    frame_description_elem.innerText = resolveDescription(data.objectID);
    museum_label.append(frame_description_elem);

    let cart_price_elem = document.createElement("div");
    cart_price_elem.setAttribute("class", "cart-price");
    cart_price_elem.innerText = "€";

    let calculated_price = document.createElement("span");
    calculated_price.setAttribute("id", priceID);
    calculated_price.innerText = price;
    cart_price_elem.append(calculated_price);
    museum_label.append(cart_price_elem);


    let cart_remove_elem = document.createElement("button");
    cart_remove_elem.setAttribute("class", "cart-remove");
    cart_remove_elem.setAttribute("onclick", );
    cart_remove_elem.addEventListener("click", );
    museum_label.append(cart_remove_elem);

    cart_item.appendChild(museum_label);

}

function addCartItem(parentId, elementTag, itemId, data, curr_index) {
    let cart = document.getElementById(parentId);
    if (cart === null) 
    let cart_item = document.createElement(elementTag);
    cart_item.setAttribute('class', "cart-item");
    cart_item.setAttribute('id', itemId);
    cart.appendChild(cart_item);
    addCartPreview(itemId, "div", "preview-container-" + curr_index, data);
    addMuseumLabel(itemId, "div", "museum-label-" + curr_index, data, curr_index);
    //cart_item.addEventListener("cart-remove", removeItem);
}


window.maybeEnableCheckout = maybeEnableCheckout;





