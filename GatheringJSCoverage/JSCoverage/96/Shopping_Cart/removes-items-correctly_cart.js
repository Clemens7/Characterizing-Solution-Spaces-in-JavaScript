import { getPrintSizes, render, calculatePrice ,getItemPrintDesc} from '../../frame.js';
import { getQueryVariables, removeCartItem, getCartItems, getArtworkMetadata } from '../util.js';

const queryParameters = getQueryVariables();

const INPUT_LIST = {
    cart: document.getElementById('cart'),
    cartTotal: document.getElementById("div-cart-total")
};

var testCartItem = {
    objectID: 123,
    image: {},
    size: "S",
    frameStyle:"natural",
    frameWidth:5.0,
    matColor:"wine",
    matWidth:5.1
};

initCart();

function initCart() {
    updateCartView()
}

function updateCartItemsCounter() {
    if(getCartItems().length > 0){
        document.getElementById("cart-link").innerHTML = "Cart (" + getCartItems().length + ")";
    }
}

function updateCheckoutButton() {
    document.getElementById("checkout-button").disabled = getCartItems().length <= 0;
}



function updateCartItems() {
    let cartTotal = INPUT_LIST.cartTotal;
    INPUT_LIST.cart.innerHTML = "";
    getCartItems().reverse().forEach(cartItem =>
        getArtworkMetadata(cartItem.objectID)
            .then(function(apiResponse){
                let cartItemHTML = createCartItem(apiResponse, cartItem);
                INPUT_LIST.cart.insertBefore(cartItemHTML,INPUT_LIST.cartTotal);
            }));
    INPUT_LIST.cart.appendChild(cartTotal);
}

function generateConfigHref(cartItem) {
    return "config.html?objectID="+cartItem.objectID+"&printSize="+cartItem.printSize+"&frameStyle="+cartItem.frameStyle
        +"&frameWidth="+cartItem.frameWidth+"&matColor="+cartItem.matColor+"&matWidth="+cartItem.matWidth;
}

function updateCartView() {
    updateCartItems();
    updateCartItemsCounter();
    updateTotalPrice();
    updateCheckoutButton();
}

export function createCartItem(apiResponse,cartItem) {
    console.log(apiResponse);
    const cartItemChild = document.createElement("div");
    cartItemChild.className = "cart-item";
    //Image
        const cartPreviewItem = document.createElement("div");
        cartItemChild.appendChild(cartPreviewItem);
        cartPreviewItem.id = "preview-container-"+cartItem.objectID;
        cartPreviewItem.className = "cart-preview";
            const cartItemPreviewA = document.createElement("a");
            cartPreviewItem.appendChild(cartItemPreviewA);
            cartItemPreviewA.href = generateConfigHref(cartItem);
                const previewImg = document.createElement("img");
                cartItemPreviewA.appendChild(previewImg);
                previewImg.className = "cart-thumb";
                previewImg.id = "preview"+cartItem.objectID;
                previewImg.alt = apiResponse.title;
                previewImg.onload = fuckJSUselessCallbackOtherwiseItWontWork => {
                    render(previewImg,cartPreviewItem,cartItem.printSize,cartItem.frameStyle,cartItem.frameWidth,cartItem.matColor,cartItem.matWidth);
                };
                previewImg.src = apiResponse.primaryImageSmall;
    //Label
    const labeldiv = document.createElement("div");
    cartItemChild.appendChild(labeldiv);
    labeldiv.className = "museum-label";
        const labelGroupDiv = document.createElement("div");
        labeldiv.appendChild(labelGroupDiv);
            const artistSpan = document.createElement("span");
            labelGroupDiv.appendChild(artistSpan);
            artistSpan.className = "artist";
            artistSpan.innerText = apiResponse.artistDisplayName;

            const titleSpan = document.createElement("span");
            labelGroupDiv.appendChild(titleSpan);
            titleSpan.className = "title";
            titleSpan.innerText = apiResponse.title;

            const dateSpan = document.createElement("span");
            labelGroupDiv.appendChild(dateSpan);
            dateSpan.innerText = ", "+apiResponse.objectDate;
            dateSpan.className = "date";

            labelGroupDiv.appendChild(document.createElement("br"));
            labelGroupDiv.appendChild(document.createElement("br"));

            const frameDescSpan = document.createElement("span");
            labelGroupDiv.appendChild(frameDescSpan);
            frameDescSpan.innerText = getItemPrintDesc(cartItem);
            frameDescSpan.className = "frame-description";

        const labelPriceDiv = document.createElement("div");
        labeldiv.appendChild(labelPriceDiv);
        labelPriceDiv.className = "cart-price";
        labelPriceDiv.innerHTML = "€ ";
            const priceSpan = document.createElement("span");
            labelPriceDiv.appendChild(priceSpan);
            priceSpan.className = "price-"+cartItem.objectID;
            priceSpan.innerText = calculatePrice(cartItem.printSize, cartItem.frameStyle,cartItem.frameWidth,
                cartItem.matWidth).toFixed(2);

        const removeItemButton = document.createElement("button");
        labeldiv.appendChild(removeItemButton);
        removeItemButton.className = "cart-remove";
        removeItemButton.onclick = fuckJSUselessCallbackOtherwiseItWontWork => {
            removeCartItem(cartItem);
            updateCartView();
        };

    return cartItemChild;
}

function updateTotalPrice() {
    const cartItems = getCartItems();
    if(cartItems.length < 1)else{
        var totalprice = 0;
        cartItems.forEach(item => {
            totalprice += parseFloat(calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth).toFixed(2));
        });
        document.getElementById("price-pretext").innerText = "Total: € ";
        document.getElementById("price-total").innerText = totalprice;
    }
}

