document.addEventListener("DOMContentLoaded", ev => {
    let cart = localStorage.getItem("cart") || "[]";
    cart = JSON.parse(cart);
    document.getElementById("cart-link").innerHTML = "Cart (" + cart.length + ")";
    const params = new URL(document.location).searchParams;
    const searchParam = params.get('q');
    if (!searchParam)  else {
        startSearch(searchParam);
    }
});


function startSearch(searchParam) {
    document.getElementById("search-info").innerText = `Searching for “${searchParam}”...`;
    const queryUrl = "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=";
    fetch(queryUrl + searchParam)
        .then((resp) => {
            return resp.json()
        })
        .then((data) => {
            document.getElementById("search-info").innerText = `Found ${data['total']} artwork${data['total'] !== 1 ? 's' } for “${searchParam}”`;
            fetchImageData(data['objectIDs']);
        })
        .catch();
}

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





function retrieveImages(objectID) {
    if (objectID in localStorage) {
        return JSON.parse(localStorage[objectID])
    }
}