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

export function set() {
    localStorage.setItem('cart', JSON.stringify(cartObjects));
}

//display number of items in the cart header
export function displayNumItems() {
    let cartSize = get().length;
    if (cartSize === 0)  else {
        document.getElementById('cart-link').innerText = `Cart (${cartSize})`;
    }
}

export 

export function removeItemFromCart({
    printSize,
    frameStyle,
    objectID,
    frameWidth,
    matColor,
    matWidth,
}) {
    const oldLength = cartObjects.length;
    let index = get().findIndex((x) => {
        const result =
            `${x.objectID}` == `${objectID}` &&
            x.printSize == printSize &&
            x.frameStyle == frameStyle &&
            x.frameWidth == frameWidth &&
            x.matColor == matColor &&
            x.matWidth == matWidth;
        return result;
    });
    if (0 <= index) {
        cartObjects.splice(index, 1);
    }
    set();
}
