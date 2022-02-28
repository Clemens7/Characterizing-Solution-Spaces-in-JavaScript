var __awaiter = (this ) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value ; }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); }  }
        
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getShippingCost, getAvailableCountries } from "./artmart-api.js";
import { calculatePrice } from "./frame.js";
/**
 * selects the element with id 'country' from the form and adds the available options from the Artmart API to it.
 */
function addCountryOptions() {
    return __awaiter(this, void 0, void 0, function* () {
        const countrySelect = document.getElementById('country');
        if (countrySelect === null || !(countrySelect instanceof HTMLSelectElement)) 
        let availableCountries = yield getAvailableCountries();
        availableCountries.forEach(country => {
            let option = document.createElement('option');
            option.value = country.code;
            option.innerText = country.name;
            countrySelect.appendChild(option);
        });
    });
}
/**
 * if the cart array in the storage does not exist or is empty,
 * the use will be redirected to the cart shopping page
 */
function getCartOrRedirect() {
    let carts = localStorage.getItem("cart");
    if (carts === null || carts.length === 0) 
    else {
        return carts;
    }
}
/**
 * calculates the subtotal price of the pictures
 * and sets the price to the element with the id 'price-subtotal'
 */
function calculateSubtotalPrice() {
    return __awaiter(this, void 0, void 0, function* () {
        let carts = getCartOrRedirect();
        // array with cart objects
        let cartList = JSON.parse(carts);
        let subTotalPrice = 0;
        // calculate subtotal price for all pictures in the cart
        for (let cart of cartList) {
            subTotalPrice += calculatePrice(cart.printSize, cart.frameStyle, cart.frameWidth, cart.matWidth);
        }
        // set subTotal price at html element
        let subTotalHTML = document.getElementById("price-subtotal");
        if (!subTotalHTML) 
        subTotalHTML.innerText = subTotalPrice.toFixed(2);
    });
}
/**
 * Retrieves the subtotal price of the element with id 'price-subtotal' and the currently selected country from the form.
 * Then accesses all other elements necessary for displaying the price calculation, gets the shipping cost from the
 * Artmart API and displays it accordingly.
 */
function calculateTotalPrice() {
    return __awaiter(this, void 0, void 0, function* () {
        const subtotalHTML = document.getElementById('price-subtotal');
        if (!subtotalHTML || isNaN(parseFloat(subtotalHTML.innerHTML))) 
        const subtotal = parseFloat(subtotalHTML.innerHTML);
        const countrySelect = document.getElementById('country');
        if (countrySelect === null || !(countrySelect instanceof HTMLSelectElement)) 
        const selectedCountry = countrySelect[countrySelect.selectedIndex];
        if (selectedCountry === null) 
        const shippingCountry = selectedCountry.value;
        let shippingHTML = document.getElementById('price-shipping');
        let totalHTML = document.getElementById('price-total');
        let payButton = document.getElementById('pay-button');
        if (!shippingHTML || !totalHTML || !payButton || !(payButton instanceof HTMLButtonElement)) 
        // disable pay button and show nothing as long as no other data
        shippingHTML.innerHTML = '&mdash;';
        totalHTML.innerHTML = '&mdash;';
        payButton.disabled = true;
        let shippingCost = yield getShippingCost(shippingCountry);
        if (shippingCost !== undefined) {
            shippingCost = shippingCost / 100.0;
            shippingHTML.innerText = shippingCost.toFixed(2);
            totalHTML.innerText = (subtotal + shippingCost).toFixed(2);
            payButton.disabled = false;
        }
    });
}
calculateSubtotalPrice();
addCountryOptions().then(() => {
    // countries must be fetched to calculate shipping costs
    calculateTotalPrice();
    // when the country is changed again, the price should be re-calculated
    const countrySelect = document.getElementById('country');
    if (countrySelect === null) 
    countrySelect.addEventListener("change", );
});
