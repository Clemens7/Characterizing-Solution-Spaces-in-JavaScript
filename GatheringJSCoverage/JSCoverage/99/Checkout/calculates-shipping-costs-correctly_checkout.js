
import * as Frame from './frame.js';
import { getDestinations } from './shipping-api.js';

document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")); 
    if(cart.length == 0 || cart == null || cart == undefined)
});

let cart = JSON.parse(localStorage.getItem("cart")); 

document.getElementById("pay-button").disabled = true; 

loadCountries();

async function loadCountries(){
    let countriesResponse = await getDestinations();
    let countries = countriesResponse.destinations;
    console.log(countries[1].displayName);

    setDropDownOnChange(countries);

    addCountriesToDropdown(countries);
}
//HSDHJADHUSBAHUDBHUASBDHJUBAHDJBHJUDSA

let subtotal = () => {

    let price = 0;
    cart.forEach((item) => {
        price= price + individualPrice(item);
    });   
    
    return parseFloat((price));
}

document.getElementById("price-subtotal").innerHTML = subtotal();


function setDropDownOnChange(countries){
    const dropdown = document.getElementById('country');
    let shippingCostUnrounded = countries[0].cost;
    dropdown.addEventListener('change', (e) => {
      //console.log(`country.target.value = ${ ""+country.target.value.cost}`);
      //console.log(`dropdown.options[dropdown.selectedIndex].value = ${ dropdown.options[dropdown.selectedIndex].value.cost }`);
      console.log(dropdown.value)
        countries.forEach((country) => {
            if(country.country == dropdown.value){
                shippingCostUnrounded = country.cost;
            }
        });   
        setShippingPrice(shippingCostUnrounded);
    });
    setShippingPrice(shippingCostUnrounded);

}



function addCountriesToDropdown(countries){
    let select = document.getElementById("country");

    for(let i = 0; i < countries.length; i++){

        let option = document.createElement("OPTION");
        let txt = document.createTextNode(countries[i].displayName);
        option.appendChild(txt);
        option.setAttribute("value",countries[i].country);
        select.insertBefore(option,select.lastChild);
    }
}

function individualPrice(item){
    return Frame.calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
}

function setShippingPrice(shippingCostUnrounded){

    let shippingCost = ((shippingCostUnrounded/100).toFixed(2));

    document.getElementById("price-shipping").innerHTML = shippingCost;

    document.getElementById("price-total").innerHTML =  ((shippingCostUnrounded/100) + subtotal()).toFixed(2);

    document.getElementById("pay-button").disabled = false; 


}


