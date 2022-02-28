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
        .catch(err => {
            console.log(err)
        });
}

function fetchImageData(objectIds) {
    objectIds.slice(0, 100).forEach()
}









