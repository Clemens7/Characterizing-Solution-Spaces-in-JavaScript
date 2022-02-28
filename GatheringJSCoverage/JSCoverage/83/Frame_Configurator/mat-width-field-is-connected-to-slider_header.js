function updateHeader(){
    const cartLink = document.querySelector("a#cart-link");

    let items = localStorage.getItem("cart");
    if(items === null){
        items = [];
    }

    cartLink.textContent = "Cart (" + items.length +")";
}

updateHeader();
