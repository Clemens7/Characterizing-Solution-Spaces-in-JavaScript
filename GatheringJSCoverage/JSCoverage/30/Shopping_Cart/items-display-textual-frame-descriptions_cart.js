

import { render, calculatePrice } from "./frame.js"




const fetchImage = (objectID) => {
    return fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)
        .then(res => {
            
            return res.json()
        })
}

 /* let cartObjects = [
    {
        "objectID": 39799,
        "frameStyle": "classic",
        "frameWidth": 35,
        "printSize": "S",
        "matColor": "coal",
        "matWidth": 13
    },
    {
        "objectID": 459055,
        "frameStyle": "natural",
        "frameWidth": 43,
        "printSize": "M",
        "matColor": "indigo",
        "matWidth": 43
    },
    {
        "objectID": 437853,
        "frameStyle": "shabby",
        "frameWidth": 32,
        "printSize":"L",
        "matColor": "mint",
        "matWidth": 33
    },
    {
        "objectID": 435809,
        "frameStyle": "elegant",
        "frameWidth": 48,
        "printSize":"S",
        "matColor": "ivory",
        "matWidth": 0
    }
] */

function retrieve(searchName) {
    const key = searchName;
    if(key in localStorage) {
        console.log(`Retrieving ${key} from local storage`);        
        return JSON.parse(localStorage[key]);
    }
}
let cart1= retrieve('cart');
if(cart1 !== undefined){
 cart1.reverse();
}


const getArtworks = async (array) => {
    const mappedData = array.map(async (cartItem) => {
        const cachedImage = JSON.parse(localStorage.getItem(cartItem.objectID))
        if(cachedImage)
        const response = await fetchImage(cartItem.objectID)
        localStorage.setItem(cartItem.objectID, response);
        return { ...cartItem, ...response };
    })
    console.log(mappedData);
    return Promise.all(mappedData)
}


getArtworks(cart1).then(artWorks => {
    console.log(artWorks);
    artWorks.forEach(art => {
        console.log(art.title);
    })
    let quantity = artWorks.length;
let cartLink = document.getElementById("cart-link");


//adds number of cart objects to navbar
function cartItems(quantity){
    if (quantity > 0) {
        cartLink.innerHTML = 'Cart '+ "(" + quantity + ")";
    }
}
displayCart(artWorks, quantity);
//display items from cart
function displayCart(artWorks, quantity){
    document.getElementById('cart').innerHTML = '';
    if(quantity){
        artWorks.forEach((item, index)=>  {
            
            divCartItem(item, index);
            divCartPreview(item, index);
            previewLink(item, index);
            previewImage(item, index);
            divMuseumLabel(item, index);
            divForSpan(item, index);
            spanArtist(item, index);
            spanTitle(item, index);
            spanDate(item, index);
            brLabel(item, index);
            brLabel(item, index);
            spanFrameDescription(item, index);
            divCartPrice(item, index);
            spanPrice(item, index);
            buttonCartRemove(item, index);
        })
        cartItems(quantity)
        //display cart total
        divCartTotal();
        divTotalPrice();
        spanTotalPrice();
        buttonCheckout(quantity);
        
        artWorks.forEach((item, index)=> {
        document.getElementsByClassName('cart-remove')[index].addEventListener('click', )  
})
    }
}



function divCartTotal() {
    let divCartTotal = document.createElement('div');
    divCartTotal.className = 'cart-total';
    document.getElementById('cart').appendChild(divCartTotal);
}

function divTotalPrice() {
    let divTotalPrice = document.createElement('div');
    divTotalPrice.className = 'price';
    divTotalPrice.innerHTML = 'Total: €';
    document.getElementsByClassName('cart-total')[0].appendChild(divTotalPrice);
}

function spanTotalPrice() {
    let spanTotalPrice = document.createElement('span');
    spanTotalPrice.id = 'price-total';
    spanTotalPrice.innerHTML = updateCartTotal(quantity); //add sum of cart
    document.getElementsByClassName('price')[0].appendChild(spanTotalPrice);
}

function buttonCheckout(quantity) {
    //if true, sonst disable
    
    let buttonCheckout = document.createElement('button');
    buttonCheckout.type = 'button';
    buttonCheckout.id = 'checkout-button';
    buttonCheckout.setAttribute("onclick","location.href='checkout.html'");
    buttonCheckout.innerHTML = 'Checkout';
    if (quantity){
    document.getElementsByClassName('cart-total')[0].appendChild(buttonCheckout);
    
    }

}
//


//
function divCartItem(item, index) {
    let divCartItem = document.createElement('div');
    divCartItem.className = 'cart-item';
    document.getElementById('cart').appendChild(divCartItem); 
}

function divCartPreview(item, index) {
    let divCartPreview = document.createElement('div');
    divCartPreview.className = 'cart-preview';
    divCartPreview.id = 'preview-container-' + index;
    document.getElementsByClassName('cart-item')[index].appendChild(divCartPreview);
}

function previewLink(item, index) {
    let previewLink = document.createElement('a');
    previewLink.href = `/config.html?objectID=${item.objectID}&printSize=${item.printSize}&frameStyle=${item.frameStyle}&frameWidth=${item.frameWidth}&matColor=${item.matColor}&matWidth=${item.matWidth}`; //add href
     previewLink.className = 'preview-link';
    document.getElementsByClassName('cart-preview')[index].appendChild(previewLink);
}
function previewImage(item, index) {
    let previewImage = document.createElement('img');
    previewImage.className = 'cart-thumb';
    let imageContainer = document.querySelector("#preview-container-" + index);
    previewImage.src = item.primaryImageSmall; //add source
    previewImage.id = 'preview-' + index;
    previewImage.alt = ''; //add alt? title
    render(previewImage,imageContainer,item.printSize,item.frameStyle,item.frameWidth,item.matColor,item.matWidth);
    document.getElementsByClassName('preview-link')[index].appendChild(previewImage);
}

function divMuseumLabel(item, index) {
    let divMuseumLabel = document.createElement('div');
    divMuseumLabel.className = 'museum-label';
    document.getElementsByClassName('cart-item')[index].appendChild(divMuseumLabel);
}

function divForSpan(item, index) {
    let divForSpan = document.createElement('div');
    divForSpan.className = 'div-for-span';
    document.getElementsByClassName('museum-label')[index].appendChild(divForSpan);
}

function spanArtist(item, index) {
    let spanArtist = document.createElement('span');
    spanArtist.className = 'artist';
    spanArtist.innerHTML = item.artistDisplayName;
    document.getElementsByClassName('div-for-span')[index].appendChild(spanArtist);
}

function spanTitle(item, index) {
    let spanTitle = document.createElement('span');
    spanTitle.className = 'title';
    spanTitle.innerHTML = item.title + ', ';
    document.getElementsByClassName('div-for-span')[index].appendChild(spanTitle);
}

function spanDate(item, index) {
    let spanDate = document.createElement('span');
    spanDate.className = 'date';
    spanDate.innerHTML = item.objectDate;
    document.getElementsByClassName('div-for-span')[index].appendChild(spanDate);
}

function brLabel(item, index) {
    let brLabel = document.createElement('br');
    brLabel.innerHTML ='';
    document.getElementsByClassName('div-for-span')[index].appendChild(brLabel);
}

function spanFrameDescription(item, index) {
    let spanFrameDescription = document.createElement('span');
    spanFrameDescription.className = 'frame-description';
    spanFrameDescription.innerHTML = frameDescriptionText(item, index);
    document.getElementsByClassName('div-for-span')[index].appendChild(spanFrameDescription);
}

function frameDescriptionText(item, index){
    let text = '';
    let size = '';
    if(item.printSize === 'S'){
        size = 'Small ';
    }else if(item.printSize === 'M')else if(item.printSize === 'L'){
        size = 'Large ';
    }
    if (item.matWidth !== 0){
        text = size + 'print in a ' + (item.frameWidth/10) + ' cm ' + item.frameStyle + ' frame with a ' + (item.matWidth/10) + ' cm ' + item.matColor + ' mat.';
    }else{
        text = size + 'print in a ' + (item.frameWidth/10) + ' cm ' + item.frameStyle + ' frame.';
    }
    console.log(text);
    
    return text;
}

function divCartPrice(item, index) {
    let divCartPrice = document.createElement('div');
    divCartPrice.className = 'cart-price';
    divCartPrice.innerHTML = '€ ';
    document.getElementsByClassName('museum-label')[index].appendChild(divCartPrice);
}

function spanPrice(item, index) {
    let spanPrice = document.createElement('span');
    spanPrice.id = 'price-' + index;

    spanPrice.innerHTML = calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth); //add correct price
    document.getElementsByClassName('cart-price')[index].appendChild(spanPrice);
}

function buttonCartRemove(item, index) {
    let buttonCartRemove = document.createElement('button');
    buttonCartRemove.className = 'cart-remove';
    buttonCartRemove.setAttribute('String', item.objectID);
    document.getElementsByClassName('museum-label')[index].appendChild(buttonCartRemove);
}








function updateCartTotal() {
    let total = 0;
    for( let i = 0; i < artWorks.length; i++){
        let price = parseFloat(((document.getElementById('price-' + i).innerHTML)));
        total = total + price;
    }
    return total.toFixed(2);
}

})
