
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
                btn[i].onclick = 
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
            arrayItems = await Promise.all(localStorageCartItemsIDs.map());

            //clear innerHTML and add cartItems to cart
            cartDocumentContainer.clear();

            for (let i in arrayItems) 
            for (let i in arrayItems) 

            addEventListenerToCloseButton();
        }

        function extractDataFromLocalStorageCart(){
            totalPrice = 0;
            localStorageCartItemsIDs = [];
            localStorageCartItemsPrice = [];
            if (localStorageCart) {
                for (let cartItem of localStorageCart) 
            }
        }

        

        function addCartTotalPrice(totalPrice) {
            const priceTotal = document.getElementById('price-total');
            priceTotal.innerText = totalPrice.toFixed(2);
        }

        

    