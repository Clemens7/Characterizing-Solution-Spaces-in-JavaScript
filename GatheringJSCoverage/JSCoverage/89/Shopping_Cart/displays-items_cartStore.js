let cartObjects = null;
export function get() {
    if (cartObjects != null) {
        return cartObjects;
    }
    try {
        cartObjects = JSON.parse(localStorage.getItem('cart')) ;
    } 
    return cartObjects;
}

export 

//display number of items in the cart header
export function displayNumItems() {
    let cartSize = get().length;
    if (cartSize === 0)  else {
        document.getElementById('cart-link').innerText = `Cart (${cartSize})`;
    }
}

export 

export 
