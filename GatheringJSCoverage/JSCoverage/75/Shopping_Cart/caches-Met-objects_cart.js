
let artworks = JSON.parse(localStorage.getItem('cart'));
if (artworks === null) 

artworks = JSON.parse(localStorage.getItem('cart'));


document.addEventListener('DOMContentLoaded', showCart);

async function showCart() {
    
    if (artworks.length === 0) 
    for (let i = artworks.length - 1; i >= 0; i--) {
        console.log(artworks[i]);
        let metadata = await retrieveArtwork(artworks[i].objectID);
        addArtworkToHTML(artworks[i], metadata)
    }
}


function getDescription(artwork) {
    let description;
    description =
        (artwork.printSize) === 'L'  :
            (artwork.printSize) === 'S' ? 'Small' :
                (artwork.printSize) === 'M' ? 'Medium' ;
    if (artwork.matWidth == "0")
        
    else {
        description += " print in a " + artwork.frameWidth/10 + " cm " + artwork.frameStyle
            + " frame with a " + artwork.matWidth/10 + " cm " + artwork.matColor + " mat.";
    }
    return description;
}

let header = document.getElementById('cart-link');
if (artworks.length === 0)  else {
    header.innerText = 'Cart (' + artworks.length + ')';
}

function sum() {
    let sum = 0;
    for (let i = 0; i < artworks.length; i++) {
        sum += parseFloat(calculatePrice(artworks[i].printSize, artworks[i].frameStyle, artworks[i].frameWidth, artworks[i].matWidth));
    }
    return sum;
}

async function retrieveArtwork(objectId) {
    if (localStorage.getItem("artObj" + objectId) != null) {
        let artworkData = localStorage.getItem("artObj" + objectId);
        return JSON.parse(artworkData);
    }}


function addArtworkToHTML(artwork, metadata) {
    const cart = document.getElementById('cart');

    const cartItemContainer = document.createElement('div');
    cartItemContainer.className = "cart-item";

    const cartPreviewContainer = document.createElement('div');
    cartPreviewContainer.className = "cart-preview";
    cartPreviewContainer.id = "preview-container-0";

    const imageLink = document.createElement('a');
    imageLink.href = "config.html?objectID=" + artwork.objectID + "&printSize=" + artwork.printSize + "&frameStyle="
        + artwork.frameStyle + "&frameWidth=" + artwork.frameWidth + "&matColor=" + artwork.matColor + "&matWidth=" + artwork.matWidth;

    const artworkImg = document.createElement('img');
    artworkImg.className = "cart-thumb";
    artworkImg.src = metadata.primaryImageSmall;

    artworkImg.id = "preview-0";
    artworkImg.onload = function () {
        render(artworkImg, cartPreviewContainer, artwork.printSize, artwork.frameStyle, artwork.frameWidth, artwork.matColor,
            artwork.matWidth);
    };
    artworkImg.alt = metadata.title;

    const artworkLabel = document.createElement('div');
    artworkLabel.className = "museum-label";

    const artworkMetadata = document.createElement('div');

    const artworkArtist = document.createElement('span');
    artworkArtist.className = "artist";
    artworkArtist.innerText = metadata.artistName;

    const artworkTitle = document.createElement('span');
    artworkTitle.className = "title";
    artworkTitle.innerText = metadata.title + ", ";

    const artworkDate = document.createElement('span');
    artworkDate.className = "date";
    artworkDate.innerText = metadata.objectDate;

    const artworkDescription = document.createElement('span');
    artworkDescription.className = "frame-description";
    artworkDescription.innerText = getDescription(artwork);

    const artworkPriceContainer = document.createElement('div');
    artworkPriceContainer.className = "cart-price";
    artworkPriceContainer.innerText = "€ " + calculatePrice(artwork.printSize, artwork.frameStyle, artwork.frameWidth, artwork.matWidth);

    const artworkPrice = document.createElement('span');
    artworkPrice.id = "price-0";

    const artworkRemove = document.createElement('button');
    artworkRemove.type = "button";
    artworkRemove.className = "cart-remove";
    artworkRemove.addEventListener("click", );

    let totalPrice = document.getElementById('price-total');
    totalPrice.innerText = sum().toFixed(2);

    //Child Relations
    cartItemContainer.appendChild(cartPreviewContainer);
    cartPreviewContainer.appendChild(imageLink);
    imageLink.appendChild(artworkImg);

    cartItemContainer.appendChild(artworkLabel);
    artworkLabel.appendChild(artworkMetadata);
    artworkMetadata.appendChild(artworkArtist);
    artworkMetadata.appendChild(artworkTitle);
    artworkMetadata.appendChild(artworkDate);
    artworkMetadata.appendChild(document.createElement('br'));
    artworkMetadata.appendChild(document.createElement('br'));
    artworkMetadata.appendChild(artworkDescription);

    artworkLabel.appendChild(artworkPriceContainer);
    artworkPriceContainer.appendChild(artworkPrice);
    artworkLabel.appendChild(artworkRemove);

    cart.appendChild(cartItemContainer);
    cart.appendChild(document.getElementsByClassName('cart-total')[0]);

}



//checkout button redirects to checkout site
let checkoutButton = document.getElementById("checkout-button");
checkoutButton.addEventListener("click", )


function getPrintSizes(img) {
    let S = [297, 297]; // A4
    let M = [420, 420]; // A3
    let L = [594, 594]; // A2

    const w = img.naturalWidth;
    const h = img.naturalHeight;

    if (h > w) {
        S[0] = Math.floor(w * S[1] / h);
        M[0] = Math.floor(w * M[1] / h);
        L[0] = Math.floor(w * L[1] / h);
    } else {
        S[1] = Math.floor(h * S[0] / w);
        M[1] = Math.floor(h * M[0] / w);
        L[1] = Math.floor(h * L[0] / w);
    }

    return {S: S, M: M, L: L};
}

/**
 * Renders an image within a given square container as a print of a certain size, with a frame and a mat.
 *
 * @param img An Image object. Note: if the image is not fully loaded yet, results might be unexpected.
 * @param container The object that contains the Image.
 * @param printSize The size of the print, either 'S', 'M' or 'L'.
 * @param frameStyle The type of frame, as a string.
 * @param frameWidth The width of the frame, in millimeters.
 * @param matColor The color of the mat, as a string.
 * @param matWidth The width of the mat, in millimeters.
 */
function render(img, container, printSize, frameStyle, frameWidth, matColor, matWidth) {

    const printSizes = getPrintSizes(img);
    const w = printSizes[printSize][0];
    const h = printSizes[printSize][1];

    let x;
    if (w > h) {
        x = container.offsetWidth / (w + 2 * matWidth + 2 * frameWidth);
    } else {
        x = container.offsetHeight / (h + 2 * matWidth + 2 * frameWidth);
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

    img.style.boxSizing = 'border-box';

    img.width = (w + 2 * matWidth + 2 * frameWidth) * x;
    img.height = (h + 2 * matWidth + 2 * frameWidth) * x;
    img.style.borderImageSource = `url(frame-styles/${frameStyle}.jpg)`;
    img.style.borderImageSlice = frameImageSlices[frameStyle];
    img.style.borderWidth = `${frameWidth * x}px`;
    img.style.backgroundColor = matColors[matColor];
    img.style.padding = `${matWidth * x}px`;
}

function calculatePrice(printSize, frameStyle, frameWidth, matWidth) {
    let price = 0.0;
    price += 30.0;

    let framePrice;
    if (frameStyle === "classic")  else if (frameStyle === "natural") {
        framePrice = 0.8;
    } else if (frameStyle === "shabby")  else if (frameStyle === "elegant") {
        framePrice = 0.85;
    }
    framePrice = framePrice * frameWidth;

    let matPrice = matWidth * 0.05;

    price = price + framePrice + matPrice;

    if (printSize === "M") {
        price = price * 2;
    }
    if (printSize === "L") 

    
    return parseFloat((Math.round((price + Number.EPSILON) * 100) / 100).toFixed(2)).toFixed(2);
}
