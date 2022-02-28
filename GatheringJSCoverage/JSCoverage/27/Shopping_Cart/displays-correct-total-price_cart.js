import { calculatePrice } from './frame.js';
import { writeNumberOfCartItems } from './global.js';

writeNumberOfCartItems(document.getElementById('cart-link'));

let data = window.localStorage["cart"];
if (data == undefined)  else {
	let cart = JSON.parse(data);
	if (cart == undefined || cart.length == 0)  else {
		buildUpPage(cart);
	}
}

const checkoutBtn = document.getElementById("checkout-button");
checkoutBtn.addEventListener("click", )



async function buildUpPage(cart) {
    let price = 0.0;
    for (var i = 0; i < cart.length; i++) {
        //all the other stuff
        let artwork = await getArtwork(cart[i]);
        addOnTop(cart[i], artwork, i);
        
		//price calculation
        let thisPrice = calculatePrice(cart[i].printSize, cart[i].frameStyle, cart[i].frameWidth, cart[i].matWidth);
		console.log(thisPrice + " (" + JSON.stringify(cart[i]) + ")");
		price += thisPrice;
    }
	
	document.getElementById("price-total").innerHTML = price;
}

async function getArtwork(item) {
    let artwork = window.localStorage.getItem(item.objectID);
    if (artwork)  
    const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + item.objectID;
    try {
        const response = await fetch(url);
        if (response.status === 404) 
        const rawData = await response.json();
        window.localStorage.setItem(item.objectID, JSON.stringify(rawData));
        console.log("retrieve from api: " + item.objectID);
        return rawData;
    }}

function generateFrameText(object) {
    var text = "";
    let size = 'Small';
    const unit = " cm ";
    let frameWidth = object.frameWidth / 10 + unit;
    let matWidth = object.matWidth / 10 + unit;
    switch(object.printSize) {
        case "L" : size = "Large";
        break;
        case "S" : size = "Small";
        break;
        
    }
    let matInfo = ".";
    if(object.matWidth != 0) {
        matInfo = " with a " + matWidth + object.matColor + " mat."
    }
    text = size + " print in a " + frameWidth + object.frameStyle + " frame" + matInfo;
    return text;
}

function addOnTop(cart, data, index) {

    const cartItem = document.createElement("div");
    cartItem.setAttribute("id", "cart-" + index);
    cartItem.setAttribute("class", "cart-item");

    const cartImg = document.createElement("img");
    cartImg.setAttribute("class", "cart-thumb");
    cartImg.src = data.primaryImageSmall;
    cartImg.setAttribute("id", "preview-" + index);
    cartImg.setAttribute("alt", data.title);

    const cartPreview = document.createElement("div");
    cartPreview.setAttribute("class", "cart-preview");
    cartPreview.setAttribute("id", "preview-container-" + index);

    const cartPrevLink = document.createElement("a");
    cartPrevLink.setAttribute("href", "./config.html?objectID=" + cart.objectID + "&printSize=" + cart.printSize + "&frameStyle=" + cart.frameStyle + "&frameWidth=" + cart.frameWidth + "&matColor=" + cart.matColor + "&matWidth=" + cart.matWidth);

    const museumLabel = document.createElement("div");
    museumLabel.setAttribute("class", "museum-label");

    const nodeArtist = document.createElement("span");
    nodeArtist.setAttribute("class", "artist");

    const nodeTitle = document.createElement("span");
    nodeTitle.setAttribute("class", "title");

    const nodeDate = document.createElement("span");
    nodeDate.setAttribute("class", "date")
    
    const frameDesc = document.createElement("span");
    frameDesc.setAttribute("class", "frame-description");

    const cartPrice = document.createElement("div");
    cartPrice.setAttribute("class", "cart-price");
    
    const price = document.createElement("span");
    price.setAttribute("id", "price-" + index);

    const cartRemove = document.createElement("button");
    cartRemove.setAttribute("class", "cart-remove");
    cartRemove.addEventListener("click", );


    const commaNode = document.createTextNode(", ");
    const currencyNode = document.createTextNode("€ ");

    cartPrice.appendChild(currencyNode);
    cartPrice.appendChild(price);

    const artistInfo = document.createElement("div");

    artistInfo.appendChild(nodeArtist);
    artistInfo.appendChild(nodeTitle);
    artistInfo.appendChild(commaNode);
    artistInfo.appendChild(nodeDate);
    const br1 = document.createElement("br");
    const br2 = document.createElement("br");
    artistInfo.appendChild(br1);
    artistInfo.appendChild(br2);
    artistInfo.appendChild(frameDesc);
    museumLabel.appendChild(artistInfo);
    museumLabel.appendChild(cartPrice);
    museumLabel.appendChild(cartRemove);

    cartPrevLink.appendChild(cartImg);
    cartPreview.appendChild(cartPrevLink);

    cartItem.appendChild(cartPreview);
    cartItem.appendChild(museumLabel);

    const textnodeArtist = document.createTextNode(data.artistDisplayName);
    nodeArtist.appendChild(textnodeArtist);
    const textnodeTitle = document.createTextNode(data.title);
    nodeTitle.appendChild(textnodeTitle);
    const textnodeDate = document.createTextNode(data.objectDate);
    nodeDate.appendChild(textnodeDate);

    const textnodeFrame = document.createTextNode(generateFrameText(cart));
    frameDesc.appendChild(textnodeFrame);
    const textnodePrice = document.createTextNode(calculatePrice(cart.printSize, cart.frameStyle, cart.frameWidth, cart.matWidth));
    price.appendChild(textnodePrice);


    document.getElementById("cart").prepend(cartItem);

}

