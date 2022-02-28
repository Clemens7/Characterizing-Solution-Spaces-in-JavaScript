
        import * as ArtmartAPI from './artmart_api.js';
        import {calculatePrice} from './frame.js';

        async function getShippingData() {
            const shippingData = await ArtmartAPI.retrieve();
            if (!shippingData) 
            return shippingData;
        }

        async function buildSelectOptions() {
            let select = document.getElementById('country');

            let destinations = await getShippingData();

            // create select options
            destinations.forEach(destination => {
                let opt = document.createElement('option');
                opt.value = destination.country;
                opt.innerHTML = destination.displayName;
                select.appendChild(opt);
            });

            // calculate first shipping display
            let shippingcost = getCostForCountry(destinations, select.options[0].value) / 100;
            console.log(getCostForCountry(destinations, select.options[0].value));
            document.getElementById('price-shipping').innerHTML = shippingcost.toFixed(2);
            document.getElementById('price-total').innerHTML = (subCost + shippingcost).toFixed(2);

            // change shipping cost display
            select.addEventListener('change', );

            function getCostForCountry(destinations, country) {
                let destination = destinations.find(destination => {
                    return destination.country === country;
                });
                return destination.cost;
            }
        }

        function onLoadOrError() {
            document.getElementById('price-total').innerHTML = "&mdash;";
            document.getElementById('price-shipping').innerHTML = "&mdash;";
            document.getElementById('pay-button').disabled = true;
        }

        function calculateSubPrice(cartItems) {
            if (cartItems.length === 0) 

            let subCost = 0;

            for (let item of cartItems) {
                subCost += calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
            }
            return subCost;
        }


        /**
         * MAIN
         */
        const cartItems = JSON.parse(localStorage.getItem('cart') );
        let subCost = calculateSubPrice(cartItems);
        if (cartItems.length === 0) 

        onLoadOrError();
        buildSelectOptions();
        document.getElementById('price-subtotal').innerHTML = subCost.toFixed(2);

    