import {render, calculatePrice} from "../frame.js";
import { CartItemsContainer } from "../header/header-dom.js";

const cart = document.getElementById('cart');

export 

export function createItem(i, artwork, printSize, frameStyle, frameWidth, matColor, matWidth){
    let item = cartItem(i, artwork, printSize, frameStyle, frameWidth, matColor, matWidth);
    cart.appendChild(item);
    let img = document.getElementById(`preview-${i}`);
    let imgContainer = document.getElementById(`preview-container-${i}`);
    img.addEventListener('load', ()=> render(img, imgContainer, printSize, frameStyle, frameWidth, matColor, matWidth));
    console.log('i: ' + i);
}

export 

export function enableButton(){
    document.getElementById('checkout-button').disabled=false;
}

export 

export function total(price){
    let elemTotal = cartTotal(price);
    cart.appendChild(elemTotal);
}

function cartItem(i, artwork, printSize, frameStyle, frameWidth, matColor, matWidth){
    let cartItem = document.createElement('div');
    cartItem.className='cart-item';

    let cartPreviewElem = cartPreview(i, artwork, printSize, frameStyle, frameWidth, matColor, matWidth);
    //console.log('cartPreviewElem' + cartPreviewElem);

    let museumLab = museumLabel(artwork, printSize, frameStyle, frameWidth, matColor, matWidth);
    //console.log('museumLabel' + museumLab);

    let cartP = cartPrice(i, artwork, printSize, frameStyle, frameWidth, matColor, matWidth);
    //console.log('cartPrice' + cartPrice);

    let button = document.createElement('button');
    button.className = 'cart-remove';
    button.addEventListener('click', );

    cartItem.appendChild(cartPreviewElem);
    cartItem.appendChild(museumLab);
    museumLab.appendChild(cartP);
    museumLab.appendChild(button);

    return cartItem;
}

export 

function cartPreview(i, artwork, printSize, frameStyle, frameWidth, matColor, matWidth){
    let cartPreview = document.createElement('div');
    cartPreview.className = 'cart-preview';
    cartPreview.id = `preview-container-${i}`;
    let aElem = document.createElement('a');
    if(frameWidth < 10) else{
        aElem.href = `./config.html?objectID=${artwork.id}&printSize=${printSize}&frameStyle=${frameStyle}&frameWidth=${frameWidth}&matColor=${matColor}&matWidth=${matWidth}`;
    }
    let img = document.createElement('img');
    img.className = 'cart-thumb';
    img.src = artwork.img;
    img.id = `preview-${i}`;
    img.alt = artwork.title;

    console.log('img: ' + i);

    cartPreview.appendChild(aElem);
    aElem.appendChild(img);
    return cartPreview;
}

//implements museum-label from cart.html | creates three span elements with classes artist, title, date, description
function museumLabel(artwork, printSize, frameStyle, frameWidth, matColor, matWidth){
    let musLabelDiv = document.createElement('div');
    musLabelDiv.className = 'museum-label';
    const div = document.createElement('div');
    const br = document.createElement('br');
    const br2 = document.createElement('br');

    let artistData = document.createElement('span');
    let titleData = document.createElement('span');
    let dateData = document.createElement('span');
    let descriptionData = document.createElement('span');

    artistData.className = 'artist';
    titleData.className = 'title';
    dateData.className = 'date';
    descriptionData.className = 'frame-description';

    artistData.innerText = artwork.artist;
    titleData.innerText = artwork.title;
    dateData.innerText = ', ' + artwork.date;
    descriptionData.innerText = description(printSize, frameStyle, frameWidth, matColor, matWidth);

    musLabelDiv.appendChild(div);
    div.appendChild(artistData);
    div.appendChild(titleData);
    div.appendChild(dateData);
    div.appendChild(br);
    div.appendChild(br2);
    div.appendChild(descriptionData);

    return musLabelDiv;
}


function cartPrice(i, artwork, printSize, frameStyle, frameWidth, matColor, matWidth){
    let div = document.createElement('div');
    div.className = 'cart-price';
    div.innerText = '€ ';
    let span = document.createElement('span');
    span.id = `price-${i}`;
    span.innerText = calculatePrice(printSize,frameStyle, frameWidth, matWidth);


    div.appendChild(span);
    return div;
}

function cartTotal(price){
    let div  = document.createElement('div');
    div.className = 'cart-total';
    let div2  = document.createElement('div');
    div2.className = 'price';
    div2.innerText = 'Total: € ';
    let span  = document.createElement('span');
    span.id = 'price-total';
    span.innerText = price;

    let button = document.createElement('button');
    button.type = 'button';
    button.id = 'checkout-button';
    button.innerText = 'Checkout';
    button.addEventListener("click", );
   
    
    div.appendChild(div2);
    div2.appendChild(span);
    div.appendChild(button);

    return div;
    
}

function description(printSize, frameStyle, frameWidth, matColor, matWidth){
    let description;
    let size;
    switch(printSize){
        
        case 'M' : size = 'Medium'; break;
        case 'L' : size = 'Large'; break;
        
    }

    if(frameWidth > 10){
        if(matWidth == 0) else{
            description = size +' print in a ' + frameWidth/10 + ' cm ' + frameStyle + ' frame ' + 'with a ' + matWidth/10 + ' cm ' + matColor + ' mat.'
        }
    }
    console.log(description);
    return description;
}


export 

/*
location.reload(true);
window.stop(); //stops cart nr
*/
