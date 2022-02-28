
        import * as Cart from './cart.js';
        import * as MetMuseum from './met_museum.js';
        import * as Frame from './frame.js';

        Cart.countProducts();

        const elementCart = document.getElementById("cart");

        if(Cart.isEmpty()){
            const newItem = document.createElement("div");
            newItem.classList.add("cart-item");
            newItem.innerHTML = '<span id="cartIsEmpty">There are no items in your shopping cart.</span>';
            elementCart.insertBefore(newItem, elementCart.firstChild); //puts the empty message before the first elem in the cart

            document.getElementById('checkout-button').disabled = true; //you can't press the checkout button
        }

        (async() =>{
            let totalPrice = 0;
            const cartItems = Cart.getCartItems();
            for(let index = 0; index < cartItems.length; index++)
            document.getElementById("price-total").innerHTML = totalPrice.toFixed(2);
        })();

        window.removeItem = 
    