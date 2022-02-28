
const URL = 'https://collectionapi.metmuseum.org';
const GET_OBJECT_API = '/public/collection/v1/objects';
const CURRENT_URL = window.location.href;
const CONFIG_SIDE = "/config.html";
const CART_SIDE = "/cart.html"
let SERVER_URL;
let configobjectID = "";


const outerContainer = document.getElementsByClassName('cart-item');
const cartPreview = document.getElementsByClassName('cart-preview');
const imageView = document.getElementsByClassName('image-link');
const image = document.getElementsByClassName('cart-thumb');
const museumLabel = document.getElementsByClassName('museum-label');
const artist = document.getElementsByClassName('artist');
const title = document.getElementsByClassName('title');
const date = document.getElementsByClassName('date');
const frameDesc = document.getElementsByClassName('frame-description');
const cartPrice = document.getElementsByClassName('cart-price');
const itemPrice = document.getElementById('price-0');
const cartRemove = document.getElementsByClassName('cart-remove');

class Image {
    static HtmlNumber = 0;
    constructor(id, title, artist, date, link, src, dimension) {
        this.id = id;
        this.title = title;
        this.artist = artist;
        this.date = date;
        this.link = link;
        this.src = src;
        this.htmlNumber = Image.HtmlNumber++;
        this.dimension = dimension;
    }

    static fillObjectFromImageResponse(responsePicture,imageAttributes) {
        let image = new Image();
        image.id = responsePicture.objectID;
        image.title = responsePicture.title;
        image.artist = responsePicture.artistDisplayName;
        image.date = responsePicture.objectDate;
        image.link = SERVER_URL + CONFIG_SIDE + "?objectID=" + responsePicture.objectID
            + "&printSize=" + imageAttributes.printSize +   "&frameWidth=" + imageAttributes.frameWidth
            + "&frameStyle=" + imageAttributes.frameStyle + "&matWidth=" + imageAttributes.matWidth
            + "&matColor=" + imageAttributes.matColor;
        image.src = responsePicture.primaryImageSmall;
        return image;
    }

    static generateHTMLCartItems (image,storageInfo) {
        const outerContainer = document.createElement('div');
        outerContainer.className = "cart-item";
        const previewContainer = document.createElement('div');
        previewContainer.className = "cart-preview";
        previewContainer.id = "preview-container-"+image.id;
        const thumbnailUrlContainer = document.createElement('a');
        thumbnailUrlContainer.href = image.link;

        const img = document.createElement('img');
        img.className = "cart-thumb";
        img.id = "preview-"+image.id;
        img.src = image.src;

        const museumLabel = document.createElement('div');
        museumLabel.className = "museum-label";
        const container = document.createElement('div');
        const imgArtist = document.createElement('span');
        imgArtist.innerText = image.artist;
        imgArtist.className = "artist";
        const imgTitle = document.createElement('span');
        imgTitle.innerText = image.title + ', ';
        imgTitle.className = "title";
        const imgDate = document.createElement('span');
        imgDate.innerText = image.date;
        imgDate.className = "date";
        const frameDesc = document.createElement('span');
        const br = document.createElement('br');
        const br1 = document.createElement('br');
        frameDesc.className = "frame-description";
        frameDesc.id = "frame-description";

        let matColorString = getMatColor();

        const cartPrice = document.createElement('div');
        cartPrice.className = "cart-price";
        cartPrice.innerText = '€ ';
        const totalPrice = document.createElement('span');
        totalPrice.id = "price-"+image.id;
        let price = calculatePrice(storageInfo.printSize, storageInfo.frameStyle, storageInfo.frameWidth, storageInfo.matWidth);
        totalPrice.innerText = price;

        const removeBtn = document.createElement('button');
        removeBtn.type = "button";
        removeBtn.className = "cart-remove";
        removeBtn.onclick = ;

        outerContainer.appendChild(previewContainer);
        previewContainer.appendChild(thumbnailUrlContainer);
        thumbnailUrlContainer.appendChild(img);

        outerContainer.appendChild(museumLabel);
        museumLabel.appendChild(container);
        container.appendChild(imgArtist);
        container.appendChild(imgTitle);
        container.appendChild(imgDate);
        container.appendChild(br);
        container.appendChild(br1);
        container.appendChild(frameDesc);

        museumLabel.appendChild(cartPrice);
        cartPrice.appendChild(totalPrice);
        museumLabel.appendChild(removeBtn);

        return outerContainer;
    }

    // create method from config, just for attribute info
    static 

    static generateHTMLCartTotal(){
        const cartTotal = document.createElement('div');
        cartTotal.className = 'cart-total';
        const totalPriceContainer = document.createElement('div');
        totalPriceContainer.className = 'price';
        totalPriceContainer.innerText = 'Total: € ';
        const totalPrice = document.createElement('span');
        totalPrice.id = 'price-total';
        totalPrice.innerText= '0';
        const checkoutButton = document.createElement('button');
        checkoutButton.className = 'checkout-button';
        checkoutButton.type = 'button';
        checkoutButton.id = 'checkout-button';
        checkoutButton.innerText = 'Checkout';
        checkoutButton.onclick = ;

        const shoppingCart = JSON.parse(localStorage.getItem('cart'));
        if(shoppingCart === null)

        let expectedTotal = 0;
        /*if(LSLength !== null){
            for (const item of LSLength) {
                expectedTotal += calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
            }
        } else {
            expectedTotal = 0;
        }*/
        totalPrice.innerHTML = expectedTotal;


        cartTotal.appendChild(totalPriceContainer);
        totalPriceContainer.appendChild(totalPrice);
        cartTotal.appendChild(checkoutButton);
        return cartTotal;
    }
}

//local storage
class Storage{
    static 

    static 

}

document.addEventListener("DOMContentLoaded",()=>{

    //let objectID = '';
    
    const urlParams = new URLSearchParams( window.location.search);

    /*if (urlParams.has('objectID')) {
        objectID = urlParams.get('objectID');
    }*/
    
    /*const cart = new Cart();

    //get all items
    cart.getItems().then(cart => {
        Storage.saveProducts(cart);
    });    */
});



function getFrameWidth(){
    const urlParams = new URLSearchParams( window.location.search);

    let frameWidth = 0;
    
    if (urlParams.has('frameWidth'))
    return frameWidth*10;
}
function getFrameStyle(){
    const urlParams = new URLSearchParams( window.location.search);
    
    let frameStyle = '';
    
    if (urlParams.has('frameStyle'))
    return frameStyle;
}
function getMatWidth(){
    const urlParams = new URLSearchParams( window.location.search);
    
    let matWidth = 0;

    if (urlParams.has('matWidth'))
    return matWidth*10;
}
function getMatColor(){
    const urlParams = new URLSearchParams( window.location.search);

    let matColor = '';

    if (urlParams.has('matColor'))
    return matColor;
}
function getPrintSizes(img) {
    let S = [297, 297]; // A4
    let M = [420, 420]; // A3
    let L = [594, 594]; // A2

    const w = img.dimension[0];
    const h = img.dimension[1];

    if (h > w) {
        S[0] = Math.floor(w * S[1] / h);
        M[0] = Math.floor(w * M[1] / h);
        L[0] = Math.floor(w * L[1] / h);
    } else {
        S[1] = Math.floor(h * S[0] / w);
        M[1] = Math.floor(h * M[0] / w);
        L[1] = Math.floor(h * L[0] / w);
    }

    return { S: S, M: M, L: L };
}

async function getRequest(url, callback, callbackObject) {
    try {
        const response = await fetch(url);
        const rawData = await response.json();
        if (callback) {
            callback(rawData, callbackObject);
        }
        return rawData;
    }}

function getSearchIDsSuccessCallback(response, imageAttributes, allreadySaved) {
    // imageAttributes has all attributes from createLocalstorageImageObject since it was generated in config.js
    if (!allreadySaved) {
        localStorage.setItem("cartObject-"+imageAttributes.objectID, JSON.stringify(response));
    }
    let image = Image.fillObjectFromImageResponse(response,imageAttributes);
    artist.innerText = image.artist;
    title.innerText = image.title + ', ';
    date.innerText = image.date;

    const cartContainer = document.getElementById('cart');
    let htmlImage = Image.generateHTMLCartItems(image, imageAttributes);
    cartContainer.insertBefore(htmlImage,cartContainer.childNodes[0]);
    let cartThumb = document.getElementById(`preview-${image.id}`);

    const totalprice = document.getElementById("price-total");
    const picturePrice = document.getElementById("price-" + imageAttributes.objectID);
    totalprice.innerText = (parseFloat(totalprice.innerText) + parseFloat(picturePrice.innerText)).toFixed(2);

    cartThumb.onload = function (){
        cartThumb.style.width = "100%"; // is necessary to obtain the dimenstion, since the img initially have 0px
        cartThumb.style.height = "100%";
        cartThumb = document.getElementById(`preview-${image.id}`);
        image.dimension = [cartThumb.width, cartThumb.height];

        image.frameWidth = getFrameWidth() *10;
        image.frameStyle = getFrameStyle();
        image.matWidth = getMatWidth() *10;
        image.matColor = getMatColor();
        //render(image, cartThumb, imageAttributes.printSize, imageAttributes.frame, imageAttributes.frameWidth, imageAttributes.mat, imageAttributes.matWidth);
        //render(image, cartThumb, getPrintSize(), getFrameStyle(), getFrameWidth(), getMatColor(), getMatWidth());
        render(image, cartThumb, imageAttributes.printSize, imageAttributes.frameStyle, imageAttributes.frameWidth, imageAttributes.matColor, imageAttributes.matWidth);
    };
    cartThumb.src = image.src;

    const frameDescription = document.getElementById('frame-description');
    let frameDescInnerText = '';
    let cart = localStorage.getItem('cart');
        cart = JSON.parse(cart);
        let size = '';
        
        Object.values(cart).map(item => {
            console.log('item objectid:' + item.objectID + ' image objectid: ' + image.id);
            if(item.objectID === image.id){
                if(item.printSize === 'S'){
                    size = 'Small';
                } else if(item.printSize === 'M'){
                    size = 'Medium';
                }
                frameDescInnerText += `${size} print in a ${item.frameWidth/10} cm ${item.frameStyle} frame`;
                if(item.matWidth === 0) else {
                    frameDescInnerText += ` with a ${item.matWidth/10} cm ${item.matColor} mat.`;
                    frameDescription.innerText = frameDescInnerText;
                }
            } else {
                frameDescInnerText += '';
                frameDescription.innerText = frameDescInnerText;
            }
        });
}





function calculatePrice(printSize, frameStyle, frameWidth, matWidth) {
    let price = 30.0;
    let frameConstant = 1;
    switch (frameStyle) {
        
        case "natural":
            frameConstant = 0.8;
            break;
        case "shabby":
            frameConstant = 0.9;
            break;
        case "elegant":
            frameConstant = 0.85;
            break;
    }

    price += frameConstant * (frameWidth / 10);
    let matPrice = (matWidth / 10) * 0.05;
    price += matPrice;

    switch (printSize) {
        case "M":
            price = price * 2;
            break;

        
    }

    return (Math.round((price + Number.EPSILON) * 100) / 100).toFixed(2);
}
function render(img, outerContainer, printSize, frameStyle, frameWidth, matColor, matWidth) {
    const printSizes = getPrintSizes(img);
    const w = printSizes[printSize][0];
    const h = printSizes[printSize][1];

    let x;
    if (w > h) {
        x = outerContainer.offsetWidth / (w + 2 * matWidth + 2 * frameWidth);
    } else {
        x = outerContainer.offsetHeight / (h + 2 * matWidth + 2 * frameWidth);
    }

    const frameImageSlices = {
        classic: 115,
        natural: 75,
        shabby: 120,
        elegant: 107
    };

    const matColors = {
        ivory: '#fffff0',
        mint: '#e0e6d4',
        wine: '#50222d',
        indigo: '#29434c',
        coal: '#333a3d',
    };

    outerContainer.style.padding = `${matWidth * x}px`;
    outerContainer.style.boxSizing = 'border-box';
    outerContainer.style.width = (w + 2 * matWidth + 2 * frameWidth) * x;
    outerContainer.style.height = (h + 2 * matWidth + 2 * frameWidth) * x;
    outerContainer.style.borderWidth = `${frameWidth * x}px`;
    outerContainer.style.backgroundColor = matColors[matColor];
    outerContainer.style.borderImageSource = `url(frame-styles/${frameStyle}.jpg)`;
    outerContainer.style.borderImageSlice = frameImageSlices[frameStyle];
}



function init() {

    const shoppingCart = JSON.parse(localStorage.getItem('cart'));
    if(shoppingCart!==null && shoppingCart!== undefined && shoppingCart !== "") {
        const cartTotalItem = document.getElementById('cart-total-items');
        cartTotalItem.innerHTML = shoppingCart.length;


        let totalCont = Image.generateHTMLCartTotal();
        document.getElementById('cart').appendChild(totalCont);

        // reverse loop, since the last added object has to be on top
        for (let i = 0; i < shoppingCart.length; i++) {
            console.log(shoppingCart[i]);

            let newUrl = window.location.href;
            if (newUrl.indexOf('?') !== -1) 
            SERVER_URL = newUrl.substring(0, newUrl.length - CART_SIDE.length);

            const shoppingCartItem = localStorage.getItem("cartObject-"+shoppingCart[i].objectID);
            if (shoppingCartItem !== null )  else {

                const currentUrlRequest = URL + GET_OBJECT_API + "/" + shoppingCart[i].objectID;
                getRequest(currentUrlRequest, getSearchIDsSuccessCallback, shoppingCart[i]);
            }


        }
    }
}

init();