const api_url = 'https://web-engineering.big.tuwien.ac.at/s20/a2/shipping';
let countryArray = [];
let shipping = 0;
let getOptions = '';
let artworks = JSON.parse(localStorage.getItem('cart'));
let subtotal = 0;


//redirects if cart is empty
if (artworks === null || artworks.length === 0) 

async function getDest() {
    getOptions = document.getElementById("country"); //get Options from dropdown
    const response = await fetch(api_url);
    const data = await response.json();

    const dest = data.destinations;
    countryArray = dest;

    Object.keys(dest).forEach(elem => {
        // options for dropdown here
        let select = document.getElementById('country');
        const opt = document.createElement('option');
        opt.value = dest[elem].country;
        opt.innerHTML = dest[elem].displayName;
        select.appendChild(opt);
    })



    // shipping costs from default selected item in array
    shipping = countryArray[getOptions.selectedIndex].cost / 100;
    document.getElementById("price-shipping").innerText = shipping.toFixed(2);

    // total costs from first item in array
    document.getElementById("price-total").innerText = "" + (subtotal + shipping).toFixed(2);

    // enable pay button when everything loads fine
    document.getElementById("pay-button").disabled = false;
}

getDest();

//set total costs from cart here as subtotal
artworks = JSON.parse(localStorage.getItem('cart'));
let sum = 0;
for (let i of artworks) {
    sum += calculatePrice(i.printSize, i.frameStyle, i.frameWidth, i.matWidth);
}
subtotal = sum;

if (subtotal != null && subtotal !== 0) {
    document.getElementById("price-subtotal").innerText = "" + subtotal.toFixed(2);
}


// update shipping costs and total when selecting other country

let getCountryCost = 0;

let onchange = document.getElementById("country");

onchange.addEventListener("change", function costChange() {
    getCountryCost = countryArray[getOptions.selectedIndex].cost; //get shipping cost from currently selected country
    // new shipping costs
    document.getElementById("price-shipping").innerText = (getCountryCost / 100.0).toFixed(2);
    // new total costs
    document.getElementById("price-total").innerText = (subtotal + getCountryCost / 100.0).toFixed(2);
});

/**
 * Returns the price of a given frame configuration in euros,
 * as a floating point number rounded to two decimal places.
 *
 * @param printSize The size of the print, either 'S', 'M' or 'L'.
 * @param frameStyle The type of frame, as a string.
 * @param frameWidth The width of the frame, in millimeters.
 * @param matWidth The width of the mat, in millimeters.
 */
function calculatePrice(printSize, frameStyle, frameWidth, matWidth) {
    let price = 0.0;
    price += 30.0;

    let framePrice;
    if (frameStyle === "classic") {
        framePrice = 1.0;
    } else if (frameStyle === "natural") {
        framePrice = 0.8;
    }
    framePrice = framePrice * frameWidth;

    let matPrice = matWidth * 0.05;

    price = price + framePrice + matPrice;

    if (printSize === "M") {
        price = price * 2;
    }
    if (printSize === "L") {
        price = price * 3.5;
    }

    return parseFloat((Math.round((price + Number.EPSILON) * 100) / 100).toFixed(2));
}
