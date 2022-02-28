import {calculatePrice} from './frame.js';

const shippingApiUrl = 'https://web-engineering.big.tuwien.ac.at/s20/a2/shipping';

const countrySelect = document.getElementById('country');
const subtotalPrice = document.getElementById('price-subtotal');
const shippingPrice = document.getElementById('price-shipping');
const totalPrice = document.getElementById('price-total');
let shippingCosts = [];

const redirectIfEmptyCart = () => {
    if (localStorage.length === 0) 
}

const fetchShippingDetails = async () => {
    await fetch(shippingApiUrl)
        .then((response) => {
            return response.json().then((data) => {
                console.debug('Fetch shipping details from: ' + shippingApiUrl, data);
                setShippingDetails(data);
            });
        })
        .catch();
}

const setShippingDetails = (data) => {
    data.destinations.map((destination) => {
        let country, displayName, cost;
        ({country, displayName, cost} = destination);
        console.debug('Set country [' + country + ' / ' + displayName + ']');

        // fill select box with options
        countrySelect.options[countrySelect.options.length] = new Option(displayName, country); 

        // fill shipping costs per country
        shippingCosts[country] = cost; 

        // fill default selected shipping
        updateShippingCosts();
    });
}

window.updateShippingCosts = function() {
    let subtotal = parseFloat(subtotalPrice.innerHTML);
    let shipping = shippingCosts[countrySelect.value];

    shippingPrice.innerHTML = (shipping/100).toFixed(2);
    totalPrice.innerHTML = (parseFloat(subtotal) + (parseFloat(shipping)/100)).toFixed(2);
};

const calculateSubtotal = () => {
    let subtotal = 0;
    let cart = JSON.parse(localStorage.getItem('cart'));

    for (const item of cart) {
        subtotal += calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
    }

    console.debug('Calculated ' + subtotal +' for subtotal');
    subtotalPrice.innerHTML = parseFloat(subtotal).toFixed(2);
}

redirectIfEmptyCart();
fetchShippingDetails();
calculateSubtotal();
