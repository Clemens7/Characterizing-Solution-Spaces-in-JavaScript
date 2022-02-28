
        import * as Util from './util.js';
        import * as Cache from './cache.js';

        if (Cache.retrieveCart().isEmpty()) 

        let destinations;

        async function fetchShippingCosts() {
            const response = await fetch("https://web-engineering.big.tuwien.ac.at/s20/a2/shipping");
            const rawData = await response.json();
            destinations = await rawData.destinations;
            console.log(destinations);
            destinations.map(destination => {
                const option = document.createElement("option");
                option.value = destination.country;
                option.innerText = destination.displayName;
                document.getElementById("country").append(option);
            });
        }

        document.getElementById("price-subtotal").innerText = Util.formatPrice(Cache.retrieveCart().getTotalPrice());

        fetchShippingCosts();

        let select = document.getElementById("country");
        select.addEventListener('change', );


    