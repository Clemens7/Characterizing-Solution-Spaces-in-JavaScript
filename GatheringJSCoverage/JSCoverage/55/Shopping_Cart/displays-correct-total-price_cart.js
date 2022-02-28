import * as Frame from "./frame.js"

const objectsAPI = "https://collectionapi.metmuseum.org/public/collection/v1/objects/"
var totalPrice = 0;

async function createCartItem(cartItem){
    let data;
    let cache = window.sessionStorage.getItem(cartItem.objectID)
    try {
        if(cache == null){
            let response = await fetch(objectsAPI + cartItem.objectID)
            data = await response.json()
            window.sessionStorage.setItem(cartItem.objectID, JSON.stringify(data))
        }
        if(true){
            let itemPrice = Frame.calculatePrice(cartItem.printSize, cartItem.frameStyle, cartItem.frameWidth, cartItem.matWidth);
            totalPrice += itemPrice;

            const cartContainer = document.getElementById("cart");

            let cartItemDiv = document.createElement("div");
            cartItemDiv.className = "cart-item";
            cartItemDiv.id = cartItem.objectID

            let cartPreviewDiv = document.createElement("div");
            cartPreviewDiv.className = "cart-preview";
            cartPreviewDiv.id = "preview-container-" + cartItem.objectID;

            let anchor = document.createElement("a");
            anchor.href = `./config.html?objectID=${cartItem.objectID}&printSize=${cartItem.printSize}&frameStyle=${cartItem.frameStyle}&frameWidth=${cartItem.frameWidth}&matColor=${cartItem.matColor}&matWidth=${cartItem.matWidth}`;
            let image = document.createElement("img");
            anchor.appendChild(image);
            cartPreviewDiv.appendChild(anchor);

            image.src = data.primaryImageSmall;
            image.className = "cart-thumb";
            image.id = "preview-" + cartItem.objectID;
            image.alt = data.title;



            let museumLabelDiv = document.createElement("div");
            museumLabelDiv.className = "museum-label";

            let paintingInfoDiv = document.createElement("div");

            let artistSpan = document.createElement("span");
            artistSpan.textContent = data.artistDisplayName;
            artistSpan.className = "artist"

            let titleSpan = document.createElement("span");
            titleSpan.textContent = data.title;
            titleSpan.className = "title"

            let dateSpan = document.createElement("span");
            dateSpan.className = "date"
            dateSpan.textContent = data.objectDate;

            let frameDescriptionSpan = document.createElement("span");
            frameDescriptionSpan.className = "frame-description"
            frameDescriptionSpan.textContent =
            frameDescriptionText(cartItem.printSize, cartItem.frameStyle, cartItem.frameWidth, cartItem.matColor, cartItem.matWidth);

            paintingInfoDiv.appendChild(artistSpan)
            paintingInfoDiv.appendChild(titleSpan)
            paintingInfoDiv.appendChild(dateSpan)
            paintingInfoDiv.appendChild(document.createElement("br"))
            paintingInfoDiv.appendChild(document.createElement("br"))
            paintingInfoDiv.appendChild(frameDescriptionSpan)
            titleSpan.insertAdjacentText('afterend', ", ")

            let cartPriceDiv = document.createElement("div")
            cartPriceDiv.textContent = "€ "
            cartPriceDiv.className = "cart-price"
            let priceSpan = document.createElement("span")
            priceSpan.id = "price-"+ cartItem.objectID
            priceSpan.textContent = itemPrice
            cartPriceDiv.appendChild(priceSpan)
            paintingInfoDiv.appendChild(cartPriceDiv)

            let removeButton = document.createElement("button")
            removeButton.className = "cart-remove"

            cartItemDiv.appendChild(cartPreviewDiv)
            cartItemDiv.appendChild(museumLabelDiv)
            cartItemDiv.appendChild(cartPriceDiv)
            museumLabelDiv.appendChild(paintingInfoDiv)
            museumLabelDiv.appendChild(cartPriceDiv)
            museumLabelDiv.appendChild(removeButton)
            cartContainer.insertBefore(cartItemDiv, cartContainer.firstChild)

            //Necessary at the end because otherwise offsetHeight/Width return 0
            image.onload = Frame.render(image, cartPreviewDiv, cartItem.printSize, cartItem.frameStyle, cartItem.frameWidth, cartItem.matColor, cartItem.matWidth)
            removeButton.addEventListener("click", )
        }
    } 
}

function frameDescriptionText(printSize, frameStyle, frameWidth, matColor, matWidth){
    let text = "";

    switch(printSize){
        case('S'):
            text += "Small print"
            break;
        case('M'):
            text += "Medium print"
            break;
        case('L'):
            text += "Large print"
            break;
    }

    text += ` in a ${frameWidth/10} cm ${frameStyle} frame`;

    text += (matColor && matWidth) ? ` with a ${matWidth/10} cm ${matColor} mat.` ;

    return text;
}



async function createAllCartItems(){
    checkEmpty()

    let cart = JSON.parse(window.localStorage.getItem("cart"))

    for(let item in cart){
        await createCartItem(cart[item]);
    }

    document.getElementById("price-total").innerText = totalPrice;
    cartLinkCounter()
    document.getElementById("checkout-button").disabled = false;
}

function checkEmpty(){
    if(JSON.parse(window.localStorage.getItem("cart")).length == 0) else {
        document.getElementById("cart-empty").style.visibility = "hidden"
        document.getElementById("checkout-button").disabled = false;
    }
}

function cartLinkCounter(){
    let numberOfItems = JSON.parse(window.localStorage.getItem("cart")).length
    if(numberOfItems == 0) else {
        document.getElementById("cart-link").innerText = `Cart (${numberOfItems})`
    }

}

document.getElementById("checkout-button").disabled = true;
createAllCartItems()
