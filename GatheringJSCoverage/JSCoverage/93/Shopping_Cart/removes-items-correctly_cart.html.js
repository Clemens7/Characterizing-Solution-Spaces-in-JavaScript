
        import {getObject} from "./metmuseum-collection-api.js";
        import {CartDocumentContainer, CartItemsElement} from "./dom-utils.js";
        import {calculatePrice, render} from "./frame.js";
        import * as LocalStorage from './cache.js';

        const cartDocumentContainer = new CartDocumentContainer('cart');
        const cartItemsElement = new CartItemsElement('cart-link');
        let totalPrice = 0;
        let localStorageCart = null;
        let localStorageCartItemsIDs = [];
        let localStorageCartItemsPrice = [];

        document.addEventListener('DOMContentLoaded', event => {
            //get cartItems from Local Storage
            localStorageCart = LocalStorage.get('cart');

            //show number of cart items
            cartItemsElement.update();

            //create cartItems
            createCartItems();
        });

        //When the "Checkout" button is pressed, redirect to checkout
        document.getElementById("checkout-button").addEventListener("click", );

        function addEventListenerToCloseButton() {
            //When the "x" button is pressed, delete cart item
            let btn = document.querySelectorAll("button");
            for (let i = 0; i < btn.length; i++) {
                btn[i].onclick = function () {
                    deleteCartItem(btn[i]);
                }
            }
        }

        

        async function createCartItems() {
            let arrayItems;

            //if exist show cart items else show message
            if (localStorageCart) {
                document.getElementById('checkout-button').disabled = false;
                extractDataFromLocalStorageCart();
            }

            addCartTotalPrice(totalPrice);

            // get all MuseumObjects from localStorage
            arrayItems = await Promise.all(localStorageCartItemsIDs.map(id => getObject(id)));

            //clear innerHTML and add cartItems to cart
            cartDocumentContainer.clear();

            for (let i in arrayItems) cartDocumentContainer.addCartItemToContainer(arrayItems[i], localStorageCart[i], localStorageCartItemsPrice[i], i, localStorageCart[localStorageCart.length-1-i]);
            for (let i in arrayItems) renderImg(localStorageCart[i], localStorageCartItemsPrice[i], localStorageCart.length-1 - i);

            addEventListenerToCloseButton();
        }

        function extractDataFromLocalStorageCart(){
            totalPrice = 0;
            localStorageCartItemsIDs = [];
            localStorageCartItemsPrice = [];
            if (localStorageCart) {
                for (let cartItem of localStorageCart) {
                    let price = parseFloat(calculatePrice(cartItem.printSize, cartItem.frameStyle, cartItem.frameWidth, cartItem.matWidth).toFixed(2));
                    totalPrice += price;
                    localStorageCartItemsIDs.unshift(cartItem.objectID);
                    localStorageCartItemsPrice.unshift(price);
                }
            }
        }

        function renderImg(ls, p, i) {
            const container = document.getElementById(`preview-container-${i}`);
            const img = document.getElementById(`object-image-${i}`);

            render(img, container, ls.printSize, ls.frameStyle,ls.frameWidth, ls.matColor, ls.matWidth);
        }

        function addCartTotalPrice(totalPrice) {
            const priceTotal = document.getElementById('price-total');
            priceTotal.innerText = totalPrice.toFixed(2);
        }

        function deleteCartItem(cartItemsCloseButton) {
            const cartItemTag = cartItemsCloseButton.parentElement.parentElement;
            const cartItemID = cartItemsCloseButton.parentElement.previousElementSibling.id.split('-')[2];

            for (let i in localStorageCart) {
                if (localStorageCart.length-1 - i === parseInt(cartItemID)) {
                    localStorageCart.splice(i, 1);
                }
            }
            if (localStorageCart.length === 0)
            LocalStorage.save('cart', localStorageCart);
            cartItemTag.remove();

            //change number of cart items
            cartItemsElement.update();

            extractDataFromLocalStorageCart();
            addCartTotalPrice(totalPrice);
        }

    