
        import { calculatePrice } from "./frame.js";

        // global variables
        var selectCountries;
        var shippingCosts;
        var payButton;
        var totalPrice;
        var subtotalPrice;

        var cors_url = 'https:cors-anywhere.herokuapp.com/';
        //var url = cors_url + 'https://web-engineering.big.tuwien.ac.at/s20/a2/shipping';
        var url = "https://web-engineering.big.tuwien.ac.at/s20/a2/shipping";
        var destinations;
        var cart = [];
        var items;

        // functions
        // define html elements
        payButton = document.getElementById('pay-button');
        selectCountries = document.getElementById('country');
        shippingCosts = document.getElementById('price-shipping');
        totalPrice = document.getElementById('price-total');
        subtotalPrice = document.getElementById('price-subtotal');

        // main
        doNotAllowPayment();

        // INFO: Dieser Part ist nur zum Testen von Cart, solange Frame Config noch
        /*let cart = [
        {objectID: 472562, printSize: 'L', frameWidth: 27, frameStyle: 'classic', matWidth: 31, matColor: 'indigo'},
        {objectID: 192770, printSize: 'S', frameWidth: 20, frameStyle: 'shabby', matWidth: 0}
        ];*/

        //localStorage.setItem("cart", JSON.stringify(cart));
        //localStorage.removeItem("cart");

        // Aufgabe 1 - erledigt
        items = JSON.parse(localStorage.getItem("cart"));
        if (items) {
            setSubtotalPrice();
        }

        fetch(url)
            .then((response) => response.json())
            .then((rawData) => rawData.destinations)
            .then(function (response_destinations) {
                destinations = response_destinations;
                for (let x in destinations) {
                    var destination = destinations[x];
                    var opt = document.createElement('option');
                    opt.innerText = destination.displayName;
                    opt.value = destination.country;
                    selectCountries.appendChild(opt);
                }
                payButton.disabled = false;
                selectCountries.addEventListener('click', calculateShipping);
                calculateShipping();
            })
            .catch();

        function doNotAllowPayment() {
            payButton.disabled = true;
            totalPrice.innerHTML = '&mdash;';
            shippingCosts.innerHTML = '&mdash;';
        }

        function setSubtotalPrice() {
            let subtotal = 0.0;
            for (let cartitem in items) {
                subtotal += calculatePrice(cartitem.printSize, cartitem.frameStyle, cartitem.frameWidth, cartitem.matWidth);
            }
            subtotalPrice.innerText = subtotal;
        }

        function calculateShipping() {
            var currentCountry = getCurrentCountry();
            var currentPrice;
            for (var i = 0; i < destinations.length; i++) {
                if (destinations[i].country == currentCountry) {
                    currentPrice = destinations[i].cost / 100;
                    var priceWithComma = currentPrice.toFixed(2);
                    break;
                }
            }
            shippingCosts.innerText = priceWithComma;
            totalPrice.innerText = currentPrice + subtotalPrice.innerText;
        }

        function getCurrentCountry() {
            return selectCountries.options[selectCountries.selectedIndex].value;
        }

    