import * as Frame from './frame.js';

window.onload = getPageContent();

function getPageContent() {

    //this if statement checks whether the cart item is defined, if yes, then it updates the number of cart items
    if (JSON.parse(localStorage.getItem("cart")) != null && JSON.parse(localStorage.getItem("cart")).length != 0) {
        document.getElementById("cart-link").innerText =
            "Cart (" + JSON.parse(localStorage.getItem("cart")).length + ")"
    }

    var requests = [];
    var cart = JSON.parse(localStorage.getItem("cart"));
    for (var key in cart) {
        requests.push(fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/' + cart[key].objectID));
    }
    Promise.all(requests)
    .then(function (responses) {
        return responses.map(function (response) {
            return response.json();
        });
    }).then(function (data) {
        for(var element in data){
            data[element].then(function (result){
                createHTMLElements(result, cart);
            });
        }

    }).catch();

    var totalsum = 0;

    for (var key in cart) {
        totalsum += parseFloat(Frame.calculatePrice(cart[key].printSize, cart[key].frameStyle, cart[key].frameWidth, cart[key].matWidth))
    }

    document.getElementById('price-total').innerText = String(totalsum.toFixed(2));

    document.getElementById('checkout-button').addEventListener('click', )
}



function createHTMLElements(data, cart){

    console.log(cart);
    var cartAttributes;
    for (var key in cart) {
        if (data.objectID == cart[key].objectID){
            cartAttributes = cart[key];
            break;
        }
    }


    //create elements
    var divCartItem = document.createElement('div');
    var divPreview = document.createElement('div');
    var a = document.createElement('a');
    var img = document.createElement('img');
    
    var divLabel= document.createElement('div');
    var divSpans = document.createElement('div');
    var spanArtist = document.createElement('span');
    var spanTitle = document.createElement('span');
    var spanDate = document.createElement('span');
    var br1 = document.createElement('br');
    var br2 = document.createElement('br');
    var spanDescription = document.createElement('span');

    var divPrice= document.createElement('div');
    var spanPrice = document.createElement('span');
    var buttonRemove = document.createElement('button');

    //set attributes
    divCartItem.setAttribute("class", "cart-item");
    divPreview.setAttribute("class", "cart-preview");
    divCartItem.setAttribute("id", "preview-container-" + data.objectID);


    a.setAttribute("href", "config.html?objectID=" + data.objectID + 
        "&printSize=" + cartAttributes.printSize + "&frameStyle=" + cartAttributes.frameStyle +
        "&frameWidth=" + cartAttributes.frameWidth + "&matColor=" + cartAttributes.matColor +
        "&matWidth=" + cartAttributes.matWidth); //TODO WRONG VALUES FOR FRAME AND MAT WIDTH BY FACTOR 10
    img.setAttribute("class", "cart-thumb");
    img.setAttribute("src", data.primaryImageSmall); //TODO: IMAGE IS SUPPOSED TO BE FRAMED (not for murder)
    img.setAttribute("alt", "");
    img.setAttribute("id", "preview-" + data.objectID);

    divLabel.setAttribute("class", "museum-label");
    spanArtist.setAttribute("class", "artist");
    spanTitle.setAttribute("class", "title");
    spanDate.setAttribute("class", "date");
    spanDescription.setAttribute("class", "frame-description");
    
    divPrice.setAttribute("class", "cart-price");
    spanPrice.setAttribute("id", "price-" + data.objectID);
    buttonRemove.setAttribute("class", "cart-remove");

    //set element values
    spanArtist.innerHTML = data.artistDisplayName;
    spanTitle.innerHTML = data.title + ", ";
    spanDate.innerHTML = data.objectDate;
    spanDescription.innerHTML = getDescription(data, cartAttributes); //TODO: proper description missing
    spanPrice.innerHTML = '€ ' + Frame.calculatePrice(cartAttributes.printSize,cartAttributes.frameStyle,cartAttributes.frameWidth,
        cartAttributes.matWidth);

    //connectAndSortElements
    divSpans.appendChild(spanArtist);
    divSpans.appendChild(spanTitle);
    divSpans.appendChild(spanDate);
    divSpans.appendChild(br1);
    divSpans.appendChild(br2);
    divSpans.appendChild(spanDescription);

    divPrice.appendChild(spanPrice);

    divLabel.appendChild(divSpans);
    divLabel.appendChild(divPrice);
    divLabel.appendChild(buttonRemove);

    a.appendChild(img);

    divPreview.appendChild(a);

    divCartItem.appendChild(divPreview);
    divCartItem.appendChild(divLabel);

    var firstChild = document.getElementById("cart").firstChild;
    
    document.getElementById("cart").insertBefore(divCartItem, firstChild);

    buttonRemove.onclick = 

    Frame.render(img, divPreview, cartAttributes.printSize, cartAttributes.frameStyle, cartAttributes.frameWidth, cartAttributes.matColor, cartAttributes.matWidth);
}

function getDescription(data, attributes){
    var description = '';

    var size = '';
    if (attributes.printSize === 'S'){size += 'Small'}
    else if (attributes.printSize === 'M')
    else if (attributes.printSize === 'L'){size += 'Large'}

    if (attributes.matWidth === 0)else{
        description = size + ' print in a ' + attributes.frameWidth/10 + ' cm ' + attributes.frameStyle + ' frame with a ' +
                      attributes.matWidth/10 + ' cm ' + attributes.matColor + ' mat.'
    }

    return description;

}