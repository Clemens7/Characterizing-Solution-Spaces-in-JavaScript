/*
    this section is only used for testing and adds some items to the shopping cart
*/


import {render} from "./frame.js";
import {calculatePrice} from "./frame.js";


let i = 0;

class item {
    
}
//let stuffInCart = [new item(500, "S", "classic", 2, "ivory", 5.5), new item(501, "M", "natural", 3, "ivory", 7.1), new item(437853, "S", "classic", 2, "ivory", 7.1), new item(459055, "S", "natural", 2, "ivory", 7.1)];
//window.localStorage.setItem("cart", JSON.stringify(stuffInCart));
/*
this is the main and final section
 */
let cart = JSON.parse(window.localStorage.getItem("cart"));
if (cart === null)
//console.log(cart);
if(cart.length === 0)

document.getElementById("cart-link").innerText = "Cart (" + cart.length + ")";
document.getElementById("checkout-button").onclick = ;

for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    //console.log("doing work for item:", item);
    getImgWithObjectId(item);
}



function getImgWithObjectId(item){
    //todo implement this
    let url = "https://collectionapi.metmuseum.org/public/collection/v1/objects/" + item.objectID;
    let request = new XMLHttpRequest();
    //console.log("API call with objectId:", item.objectID);
    let cachedResponse = window.localStorage.getItem(url);
    if (cachedResponse === null){
        //console.log("cache is null");
        request.open("GET", url);
        request.onload = function (){
            window.localStorage.setItem(url, this.response);
            renderItem(item, this.response);
        };
        request.send();
    }
}

function objectIndexOf(array, obj) {
    for (let j = 0; j < array.length; j++) {
        if (JSON.stringify(array[j]) === JSON.stringify(obj))return j;

    }}

function getFullSize(printSize) {
    switch(printSize){
        case 'S':
            return "Small";
        case 'M':
            return "Medium";
        case 'L':
            return "Large";
    }
}

function removeClickedHandler(){
    let removeFromCart = JSON.parse(this.parentElement.parentElement.getAttribute("objectId"));
    let index = objectIndexOf(cart, removeFromCart);

    if (index > -1){
        cart.splice(index, 1);
        window.localStorage.setItem('cart', JSON.stringify(cart));
    }
    //console.log("cart", cart);
    document.getElementById("cart-link").innerText = "Cart (" + cart.length + ")";
    document.getElementById("cart").removeChild(this.parentNode.parentNode);
    return true;
    /*let id = this.parentElement.parentElement.getAttribute("objectId");
    let child = cart.firstChild;
    do {
        if (child.objectID === id){
            alert("found");S
        }
        child = cart.child
    } while (child !== cart.lastChild);*/
    /*let removeElement = JSON.parse(this.parentElement.parentElement.getAttribute("objectId"));
    //console.log(removeElement);
    //let index = cart.indexOf(removeElement);
    //console.log("index:", cart);
    document.getElementById("cart").removeChild(this.parentNode.parentNode);
    document.getElementById("cart-link").innerText = "Cart (" + cart.length + ")";*/
}

function renderItem(item, data){
    data = JSON.parse(data);
    //console.log("data:", data);
    //console.log("dimensions:", data.dimensions);
    let imageObject = new Image();
    imageObject.src = data.primaryImageSmall;
    imageObject.onload = function () {
        ////console.log("complete request:", data.primaryImage, item.printSize, item.frameStyle, item.frameWidth, item.matColor, item.matWidth);
        //todo fix the render call


        let cartElement = document.getElementById("cart");
        imageObject.width = imageObject.naturalWidth;
        imageObject.height = imageObject.naturalHeight;
        //console.log("last", cartElement.lastElementChild);


        let cartItem = document.createElement('div');
        let cartPreview = document.createElement('div');
        let link = document.createElement('a');
        let museumLabel = document.createElement('div');
        let div = document.createElement('div');
        let artist = document.createElement('span');
        let title = document.createElement('span');
        let date = document.createElement('span');
        let br = document.createElement('br');
        let description = document.createElement('span');
        let cartPrice = document.createElement('div');
        let price = document.createElement('span');
        let cartRemove = document.createElement('button');
        //cart.insertBefore(cartItem, cart.firstChild);

        cartItem.setAttribute("class", "cart-item");
        cartItem.setAttribute("objectId", JSON.stringify(item));
        cartPreview.setAttribute("id", "preview-container-" + i);
        cartPreview.setAttribute("class", "cart-preview");
        i++;
        //printSize, frameStyle, frameWidth, matColor, matWidth
        link.setAttribute("href", "./config.html?objectID=" + item.objectID + "&printSize=" + item.printSize + "&frameStyle=" + item.frameStyle + "&frameWidth=" + item.frameWidth + "&matColor=" + item.matColor + "&matWidth=" + item.matWidth);
        imageObject.setAttribute("class", "cart-thumb");
        imageObject.setAttribute("id", "preview-" + i);
        imageObject.setAttribute("alt", "image");
        museumLabel.setAttribute("class", "museum-label");
        artist.setAttribute("class", "artist");
        title.setAttribute("class", "title");
        date.setAttribute("class", "date");
        description.setAttribute("class", "frame-description");
        cartPrice.setAttribute("class", "cart-price");
        price.setAttribute("id", "price-" + i);
        cartRemove.setAttribute("class", "cart-remove");
        cartRemove.onclick = removeClickedHandler;


        title.innerText = data.title + ", ";
        date.innerText = data.objectDate;
        artist.innerText = data.artistDisplayName;
        if (item.matWidth === 0)else {
            description.innerText = getFullSize(item.printSize) + " print in a " + item.frameWidth/10 + " cm " + item.frameStyle + " frame with a " + item.matWidth/10 + " cm " + item.matColor + " mat.";
        }
        //cartElement.appendChild(cartItem);
        //cartElement.insertBefore(cartItem, cartElement.lastElementChild);
        cartElement.insertBefore(cartItem, cartElement.firstElementChild);
        //cartElement.appendChild(cartItem);
        cartItem.appendChild(cartPreview);
        cartItem.appendChild(museumLabel);
        cartPreview.appendChild(link);
        museumLabel.appendChild(div);
        museumLabel.appendChild(cartPrice);
        museumLabel.appendChild(cartRemove);
        cartPrice.innerText = "€ ";
        price.innerText = calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
        let total = document.getElementById("price-total");
        total.innerText = parseFloat(total.innerText) + calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
        cartPrice.appendChild(price);
        div.appendChild(artist);
        div.appendChild(title);
        div.appendChild(date);
        div.appendChild(br);
        div.appendChild(description);
        link.appendChild(imageObject);
        //console.log(cartElement);


        //todo make img here too

        //console.log("render call:", imageObject, cartItem, item.printSize, item.frameStyle, item.frameWidth, item.matWidth, item.matColor);
        render(imageObject, cartPreview, item.printSize, item.frameStyle, item.frameWidth, item.matColor, item.matWidth);

        /*
        <div class="cart-item">
            <div class="cart-preview" id="preview-container-0">
              <a href="">
                <img class="cart-thumb" src="" id="preview-0" alt="">
              </a>
            </div>
            <div class="museum-label">
              <div>
                <span class="artist"></span>
                <span class="title"></span>,
                <span class="date"></span>
                <br><br>
                <span class="frame-description"></span>
              </div>
              <div class="cart-price">€ <span id="price-0">0</span></div>
              <button class="cart-remove"></button>
            </div>
      </div>
         */
    }
}

