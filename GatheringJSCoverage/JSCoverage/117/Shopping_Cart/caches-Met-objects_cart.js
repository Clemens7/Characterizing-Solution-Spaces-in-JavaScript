// this method returns the subtotal of the cart as an integer and the method is used for checkout
export 

export function getCartItems(){
    var cart = JSON.parse(localStorage.getItem('cart'));
    if(!cart)
    return cart;
}

export function isEmpty(){
    let tempItems = getCartItems();
    if(tempItems.length<1)
    else{
        return false;
    }
}

export function countProducts(){
    const cartLink = document.getElementById("cart-link");
    const countProd = getCartItems().length;
    if(countProd<=0)else{
        cartLink.innerHTML = 'Cart (' + countProd + ")";
    }
}

export 

export 
