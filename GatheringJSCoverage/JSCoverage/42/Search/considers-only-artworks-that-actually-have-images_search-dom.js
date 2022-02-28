

function modifySearchBar(text) {
    var bar = document.getElementById('search-info');
    bar.innerHTML = text;
}

function clear() {
    var container = document.getElementById('gallery');
    container.innerHTML = '';
}

function addCart(num){
    document.getElementById("cart-link").innerHTML="Cart ("+num+")";

}