import {CartItem} from "./cartItem.js";
import {calculatePrice} from "./frame.js";

//loads countries and shipping prices from "https://web-engineering.big.tuwien.ac.at/s20/a2/shipping"
async function fetchCountries() {
    return new Promise( (resolve, reject) => {fetch("https://web-engineering.big.tuwien.ac.at/s20/a2/shipping")
        .then(response => {
            if (response.ok) {
                response.json().then(
                    json => {
                        //console.log(json.destinations);
                        /*const selectElement = document.getElementById("country");
                        for (let i = 0; i < json.destinations.length; i++) {
                            selectElement.add(new Option(json.destinations[i].displayName));
                        }*/
                        resolve(json.destinations);
                    }
                )
            }
        })
        .catch();} );
}

//inserts the countries into the select "country"
function insertCountriesIntoField(destinations){
    const selectElement = document.getElementById("country");
    for (let i = 0; i < destinations.length; i++) {
        selectElement.add(new Option(destinations[i].displayName, destinations[i].country));
    }
    selectShippingPrice(destinations);
    selectElement.addEventListener('change' , function (){selectShippingPrice(destinations)}, false);
}

//changes the price of shipping and total according to the cart items prices and shipping costs
function selectShippingPrice(destinations) {
    const countrySelect = document.getElementById("country");
    var country = countrySelect.options[countrySelect.selectedIndex].text;
    console.log(country);
    var cost = destinations.find(x => x.displayName === country).cost;
    const shippingPrice = document.getElementById("price-shipping");
    shippingPrice.innerText = parseFloat(cost.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ".")).toFixed(2);
    const totalPrice = document.getElementById("price-total");
    totalPrice.innerText = (parseFloat(sum) + parseFloat(cost.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ".").valueOf())).toFixed(2);
}

//gets the sum of the price of all cart items
function getSum() {
    let sum = 0;
    items.forEach(item => sum += calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth));
    return sum;
}

//redirects to cart.html if cart is empty


let items = [];

if (localStorage.getItem("cart") !== undefined && localStorage.getItem("cart") !== null) {
    items = JSON.parse(localStorage.getItem("cart"))
        .map(item => new CartItem(item.objectID, item.printSize, item.frameWidth, item.frameStyle, item.matWidth, item.matColor));
}
if (items.length === 0) 

var sum = getSum();
console.log(sum);

document.getElementById("price-subtotal").innerText = sum;

fetchCountries().then(response => insertCountriesIntoField(response));