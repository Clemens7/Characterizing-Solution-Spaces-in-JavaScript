


        import {calculatePrice, render} from "./frame.js";

        // let localStorage = window.locallocalStorage;
        const wrapper = document.getElementById('cart');

        let sumTotal = 0;

        // const clearlocalStorage = document.createElement('button');
        // clearlocalStorage.innerText="lel gonbe";
        // wrapper.appendChild(clearlocalStorage);
        // clearlocalStorage.addEventListener('click', event => locallocalStorage.clear());

        const checkoutButton = document.getElementById('checkout-button');
        const total = document.getElementById('price-total');
        const empty = document.createElement('h1');
        empty.innerHTML = 'There are no items in your shopping cart. <br><br>';
        const cartLink = document.getElementById('cart-link');
        const objectAPI = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';


        // const test = [{
        //     objectID: 400,
        //     printSize: 'L',
        //     frameWidth: 27,
        //     frameStyle: 'classic',
        //     matWidth: 31,
        //     matColor: 'indigo'
        // }];
        //
        // localStorage.setItem('cart', JSON.stringify(test));


        checkoutButton.addEventListener('click', );

        document.addEventListener('DOMContentLoaded', event => {

            if (!isEmpty()) 

        });

        // function checkDuplicates(imgID) {
        //     let cart = JSON.parse(localStorage.getItem('cart'));
        //     if (cart == null)
        //         return false;
        //     for (let img of cart) {
        //         if (img.objectID === imgID) {
        //             return true;
        //         }
        //     }
        //     return false;
        // }

        function isEmpty() {
            console.log(JSON.parse(localStorage.getItem('cart')));
            if (localStorage.getItem('cart') == null ) {
                wrapper.insertBefore(empty, wrapper.firstChild);
                checkoutButton.disabled = true;
                cartLink.innerText = "Cart";
                localStorage.clear();
                return true;
            }}

        // function getParameterByName(name) {
        //     const url = window.location.href;
        //     name = name.replace(/[\[\]]/g, '\\$&');
        //     var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        //         results = regex.exec(url);
        //     if (!results) return null;
        //     if (!results[2]) return '';
        //     return decodeURIComponent(results[2].replace(/\+/g, ' '));
        // }

        

        // function addItem(img) {
        //     console.log(img);
        //     if (localStorage.getItem('cart') === null) {
        //         localStorage.setItem('cart', JSON.stringify([img]));
        //     } else {
        //         let cart = JSON.parse(localStorage.getItem('cart'));
        //         cart.push(img);
        //         localStorage.setItem('cart', JSON.stringify(cart));
        //     }
        // }

        

        

        

    