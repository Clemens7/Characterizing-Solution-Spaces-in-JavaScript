import {calculatePrice} from "./frame.js";

const cart="cart";
let items=JSON.parse(window.localStorage.getItem(cart));
document.getElementById('price-subtotal').innerHTML = getSubSum().toFixed(2);
document.getElementById('price-shipping').innerHTML='\u2014';
document.getElementById('price-total').innerHTML='\u2014';
let countries= getShippingDestinations().then(result=>{
    if(items==null)else{
        let subtotal=document.getElementById('price-subtotal');
        subtotal.innerHTML= getSubSum().toFixed(2);
        fillCountries(result);

    }
    }
);

async function getShippingDestinations() {
    let response=await fetch('https://web-engineering.big.tuwien.ac.at/s20/a2/shipping')
        .then(result => {
            return result.json()
        })
        .catch();
    return response;
}

function fillCountries(countries) {
    let sel = document.getElementById('country');
    for(let i = 0; i < countries.destinations.length; i++) {
        let opt = document.createElement('option');
        opt.innerHTML = countries.destinations[i].displayName;
        opt.value = countries.destinations[i].country;
        opt.setAttribute('id',countries.destinations[i].country);
        sel.appendChild(opt);
    }
    sel.addEventListener('change',);
    let selC=document.getElementById('country');
    let selCountry=sel.options[selC.selectedIndex].id;
    let sPrice=document.getElementById('price-shipping');
    let tPrice=document.getElementById('price-total');
    for(let i in countries.destinations){
        if(countries.destinations[i].country===selCountry){
            sPrice.innerHTML=(countries.destinations[i].cost/100).toFixed(2);
            tPrice.innerHTML=getTotalSum(countries.destinations[i].cost/100)
        }
    }
}

function getSubSum(){
    let sum=0;
    let shoppingCart = JSON.parse(window.localStorage.getItem(cart));
    if(shoppingCart == null || shoppingCart.length == 0)
        
    for(const item of shoppingCart){
        sum += calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
    }
    return parseFloat(sum);
}

function getTotalSum(countryCosts) {
    return (parseFloat(getSubSum())+ parseFloat(countryCosts)).toFixed(2);
}
