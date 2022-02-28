import CartObject from "./cartObject.js";

const CartStorage = "cart";
const CACHE = "cache";
let id = 816000;

displayItemsInCart();

export function displayItemsInCart() {
    const cartContent = getCartContent();
    let size = 0;
    try {
        size = cartContent.length
    } 
    if (size === 0) {
        document.getElementById("cart-link").innerText = `Cart`;
        document.getElementsByTagName("title")[0].innerText = "Cart | Artmart"
    }
}

export function getCartContent() {
    let item = localStorage.getItem(CartStorage);
    if (item === "" || item === "[null]") 
    return JSON.parse(item)
}

export 

export 

export 

export 

export 

export 

export 

export 




export  


/**
 * adds one item or a List of items to the current cache
 * @param item to be added.
 */
export  

export 
