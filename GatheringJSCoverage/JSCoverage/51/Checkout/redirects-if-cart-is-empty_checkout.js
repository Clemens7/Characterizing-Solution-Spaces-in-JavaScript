
// testing if checkout.js is running
console.log("running");
//import {subTotal, sumPrice} from "./cart.js";
import {calculatePrice} from "./frame.js";


/*const Shipping_API= 'https://web-engineering.big.tuwien.ac.at/s20/a2';
const shippingXHR= new XMLHttpRequest();
shippingXHR.responseType= 'json';
shippingXHR.open('GET', '${Shipping_API}/shipping');
shippingXHR.send();
*/





const subTotalPrice= document.getElementById('price-subtotal');
const shippingPrice= document.getElementById('price-shipping');
const total= document.getElementById('price-total');
calculateSubtotal();


async function getDestinations () {
    try{
        const response = await fetch(`https://web-engineering.big.tuwien.ac.at/s20/a2/shipping`);
        const rawData = await response.json();
        return rawData;
    }}


//var destinations;
getDestinations().then(function(result){
    let countries;
    countries=result.destinations;
    for (var i= 0; i<countries.length;i++){
        updateOption(countries[i].country, countries[i].displayName)
    }
    //console.log((destinations));
    console.log( result);})


function updateOption(value,name) {
    let option= document.getElementById("country");
    var opt= document.createElement('option');
    opt.value=value;
    opt.text= name;
    //opt.appendChild(document.createTextNode(name));
    option.add(opt);
}


//Selecting Country and get the shipping price
var x=document.getElementById("country");
x.addEventListener("change",)


//subTotalPrice.innerText =subTotal.innerText;
//subTotalPrice.innerText= sumPrice;
    const temp= document.getElementById('country');
    console.log(subTotalPrice.innerText)
    console.log(typeof subTotalPrice.innerText)

function calculateSubtotal() {
        let subtotal=0.00;

        subTotalPrice.innerText=subtotal.toFixed(2);
    }

    /*
        function calculateTotal(subtotal,shippingprice) {
        console.log(typeof subtotal)
        console.log(typeof shippingprice)
        let total= subtotal+shippingprice;
        let text=total.toString(10);
        total.innerText= total;
        console.log(text)
        console.log(typeof text+ "text")
        //total.innerText= text;
        }*/


//checkCart();




    export {getDestinations};
