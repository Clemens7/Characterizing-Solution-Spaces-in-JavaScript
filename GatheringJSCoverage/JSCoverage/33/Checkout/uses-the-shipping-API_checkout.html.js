
        import {calculatePrice} from "./frame.js";

        const url = "https://web-engineering.big.tuwien.ac.at/s20/a2/shipping";
        let countries;
        let shipping;
        let subtotal;
        document.getElementById("pay-button").disabled = true;

        let cart = JSON.parse(localStorage.getItem('cart'));

        if (cart == null || cart.length === 0)  else {
            let price = 0.0;
            for (let x = 0; x < cart.length; x++) {
                price = price + calculatePrice(cart[x].printSize, cart[x].frameStyle, cart[x].frameWidth, cart[x].matWidth);
            }
            subtotal = price;
            if (price === 0)  else {
                document.getElementById("price-subtotal").innerHTML = subtotal.toFixed(2);
            }
        }

        getCountries();

        document.querySelector("#country").onchange = 

        function getCountries() {
            fetch(url).then(res => {
                return res.text();
            }).then(data => {
                addCountryOptions(data);
                shippingPrice();
            }).catch()
        }

        function addCountryOptions(data) {
            countries = JSON.parse(data);
            countries = countries.destinations;
            const select = document.getElementById("country");
            for (let country of countries) {
                let option = document.createElement("option");
                option.setAttribute("value", country.country);
                option.innerText = country.displayName;
                select.appendChild(option);
            }
        }

        function shippingPrice() {
            let country = document.getElementById("country").value;

            for (let x = 0; x < countries.length; x++) {
                if (country === countries[x].country) {
                    let price = 0.0;
                    price = price + (countries[x].cost) / 100;
                    if (price !== 0) {
                        document.getElementById("price-shipping").innerHTML = price.toFixed(2);
                        document.getElementById("price-total").innerHTML = (subtotal + price).toFixed(2);
                        document.getElementById("pay-button").disabled = false;
                    }
                }
            }
        }
    