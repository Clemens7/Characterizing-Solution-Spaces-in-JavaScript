document.addEventListener("DOMContentLoaded", ev => {
    let cart = localStorage.getItem("cart") ;
    cart = JSON.parse(cart);
    document.getElementById("cart-link").innerHTML = "Cart (" + cart.length + ")";
    const params = new URL(document.location).searchParams;
    const searchParam = params.get('q');
    if (!searchParam) {
        showingHighlights()
    }
});




function fetchImageData(objectIds) {
    objectIds.slice(0, 100).forEach(element => {
        let data = retrieveImages(element);
        if (data) {
            addingImage(data)
        }
    })
}

function newDOM(tag, attributes, values, innerHTML) {
    let newDOM = document.createElement(tag);
    attributes.forEach(element => {
        newDOM.setAttribute(element, values[attributes.indexOf(element)])
    });
    newDOM.innerHTML = innerHTML;
    return newDOM;
}

function addingImage(data) {
    const gallery = document.getElementById("gallery");
    let baseDiv = newDOM('div', ['class'], ['museum-label'], "");
    baseDiv.appendChild(newDOM('span', ['class'], ['artist'], data['artistDisplayName']));
    baseDiv.appendChild(newDOM('span', ['class'], ['title'], data['title'] + ", "));
    baseDiv.appendChild(newDOM('span', ['class'], ['date'], data['objectDate']));
    let imgRef = newDOM('img', ['src', 'alt', 'id'], [data['primaryImageSmall'], data['objectID'], "object-image-" + data['objectID']], "");
    let a = newDOM('a', ['href', 'id'], ['config.html?objectID=' + data['objectID'], "object-" + data['objectID']], "");
    a.appendChild(imgRef);
    a.appendChild(baseDiv);
    let newImage = newDOM('div', ['class'], ['thumb'], "");
    newImage.appendChild(a);
    gallery.appendChild(newImage)
}

function showingHighlights() {
    fetch("highlights.json").then(resp => {
        return resp.json();
    }).then(data => {
        fetchImageData(data['highlights']);
    }).catch()
}



function retrieveImages(objectID) {
    if (objectID in localStorage) {
        return JSON.parse(localStorage[objectID])
    }
}