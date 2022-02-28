import {Country} from "./country.js";
import * as Cart from "./cart.js";
//comment
let globalCountries;
let subtotalCosts;

window.onload = function () {
    start();

    async function start() {
        globalCountries = await getCountries();
        subtotalCosts = await getSubTotal();
    }
};

//document.getElementById('country').addEventListener('click', selectOption, false);

//document.getElementById('country').addEventListener('change', selectOption, false);
//document.querySelector('#country').addEventListener('change', selectOption, false);
/**
 * This listener is triggered when a click event occurs
 * it gets the shipping costs and displays them
 * then calculates the total costs
 */
document.getElementById('country').addEventListener('click', selectOption, false);


/**
 * This listener is triggered when a change event occurs
 * it gets the shipping costs and displays them
 * then calculates the total costs
 */
document.querySelector('#country').addEventListener('change',event => {
    let index = event.target.options[event.target.selectedIndex];
    let selectedCountry = event.target.options[event.target.selectedIndex].innerText;
    console.log(index);
    console.log(selectedCountry);
    let shipping;
    let countries = globalCountries;

    for (let index in countries) {
        console.log('CURRCOUNTRY');
        let currCountryName = countries[index].displayName;
        console.log(currCountryName);
        console.log('SELECTED COUNTRY');
        console.log(selectedCountry);
        console.log(typeof selectedCountry);

        shipping = countries[index].cost / 100;
        if (currCountryName === selectedCountry) {
            console.log('found selected Country');
            console.log(currCountryName);
            let htmlTemplateElementShipping = document.getElementById('price-shipping');

            let shippingStr = shipping.toFixed(2).toString();

            if (shipping > 0) {
                console.log('DISPLAY SHIPPING');
                console.log(shippingStr);
                htmlTemplateElementShipping.innerHTML = shippingStr;
                htmlTemplateElementShipping.innerText = shippingStr;
                htmlTemplateElementShipping.textContent = shippingStr;
                let htmlTemplateElementTotal = document.getElementById('price-total');
                console.log(shipping);
                console.log(subtotalCosts);
                const total = parseFloat(subtotalCosts) + parseFloat(shipping);
                console.log(total);
                const totalStr = total.toFixed(2).toString();
                if (total > 0) {
                    htmlTemplateElementTotal.innerHTML = totalStr;
                    htmlTemplateElementTotal.innerText = totalStr;
                    htmlTemplateElementTotal.textContent = totalStr;
                }

                // displayTotal(shipping, subtotal);
            }
            break;


        }
    }


});
/*-----------------------------------------------REDIRECT-----------------------------------------------*/
/**
 * This listener is triggered when the Dom content is loaded
 * it redirects if there are no cart items
 * it displays the subtotal if there are cart items
 */
document.addEventListener('DOMContentLoaded', event => {

    redirect();
    displaySubTotal();

});

/**
 * this method redirects if the cart is empty
 * @returns {Promise<void>}
 */
async function redirect() {
    if (await Cart.cartSize() === 0 /*|| await Cart.getCart() === null*/) 


}


/*-----------------------------------------------COSTS-----------------------------------------------*/
/**
 * This function displays the subtotal
 * @returns {Promise<void>}
 */
async function displaySubTotal() {
    const subtotal = await getSubTotal();
    let htmlTemplateElementCart = document.getElementById('price-subtotal');
    if (subtotal > 0) {
        htmlTemplateElementCart.innerHTML = subtotal;
        // htmlTemplateElementCart.innerText = subtotal;
    }


}

/**
 * this method gets the subtotal
 * @returns {Promise<string>}
 */
async function getSubTotal() {
    console.log('============');
    console.log('Cart totalcosts');
    let subtotal = await Cart.getTotalCosts();
    console.log(subtotal);
    return subtotal;

}

/**
 * this method calculates and displays the total costs
 * @param shippingCosts of selected country
 * @param subtotal total costs of items
 */



/*-----------------------------------------------COUNTRIES-----------------------------------------------*/
/**
 * this function sets options
 * @param i value
 * @param countryName option name
 */


/**
 * this function gets and sets countries as select options
 * @returns {Promise<[]>}
 */
async function getCountries() {
    const url = 'https://web-engineering.big.tuwien.ac.at/s20/a2/shipping';
    try {
        const response = await fetch(url);
        const data = await response.json();
        const countries = [];
        //let c;
        //let country = document.getElementById('country');
        let i = 0;
        for (let rawCountry of data.destinations) {
            countries.push(new Country(rawCountry.country,
                rawCountry.displayName,
                rawCountry.cost));
            let countryName = rawCountry.displayName;
            let countryCountry = rawCountry.country;
            appendOption(countryCountry, countryName);
            //setOption(i, countryName);
            // c = document.createElement('option');
            //c.text = countryName;
            //c.innerText = countryName;
            //c.innerHTML = countryName;
            //country.options.add(c, i);
            i++;

        }

        console.log('SEE TESTING STUFF');
        console.log(document.getElementById('country').options);
        console.log(typeof document.getElementById('country').options);
        console.log(Array.from(document.getElementById('country').options).map(o => o.text));
        console.log(typeof Array.from(document.getElementById('country').options).map(o => o.text));
        console.log('got available countries');
        return countries;

    }}

/**
 * This funtion appends the option
 * @param i value
 * @param countryName option name
 * @returns {Promise<void>}
 */
async function appendOption(i, countryName) {
    let selectElement = document.getElementById('country');
    let optionNode = Cart.createNodeFromHTMLString(
        `<option value="${i}">${countryName}</option>`
    );

    console.log('=====================');
    console.log('append child: ');
    selectElement.appendChild(optionNode);

}



/**
 * This method gets all available countries
 * @returns {Promise<any>}
 */



