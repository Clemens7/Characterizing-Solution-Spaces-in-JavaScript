import { TEST_VALUE } from './global.js';


console.log(TEST_VALUE + 4);




document.getElementById("country").addEventListener("change", function(){updateShipping();});

// disable paybutton while data is loading, prices are dashes

document.getElementById("pay-button").disabled = true;



// enable paybutton and show prices when site has loaded

window.addEventListener("load", showPrice());
var url = 'https://web-engineering.big.tuwien.ac.at/s20/a2/shipping';

function showPrice(){
        document.getElementById("pay-button").disabled = false;
        }

createSelections();


function updateShipping(){
retrieveData(url).then(value => {
    let countries = value;


   let cost = document.getElementById("price-shipping");

    let current  = document.getElementsByClassName("options");
    let selected = 0;

    for (let x of current){if(x.selected === true){selected = x;}};


    for(let i = 0; i < countries.length; i++){
        if(selected.innerText === countries[i].displayName){
               cost.innerText = countries[i].cost/100 + ".00";
       }
        }

});
}



async function retrieveData(url){
        try {
            const response = await fetch(url);
            const rawData = await response.json();
            const responseCountries = await rawData.destinations;





           var selected = 0;
           let cost = document.getElementById("price-shipping");
           let current  = document.getElementsByClassName("options");
           for (let x of current){if(x.selected == true){selected = x;}};
           cost.innerText = 15 + ".00";

           /*for(let i = 0; i < responseCountries.length; i++){

                   if(selected.innerText == responseCountries[i].displayName){

                           cost.innerText = responseCountries[i].cost/100;
                   }

           }*/
           return responseCountries;
        }}

function createSelections(){
retrieveData(url).then(value => {
    let countries = value;

    let current = 0;
    let select = document.getElementById("country");


    for(let i = 0; i < countries.length; i++){
            current = document.createElement("option");
            current.className = "options";
            current.value = countries[i].country;
            current.innerText = countries[i].displayName;
            select.appendChild(current);

           }
    });
}

/*let itemsInCart = document.getElementsByClassName("cart-item");

    if(itemsInCart.length === 0){
    redirect();
    }

function redirect(){
    window.location.replace("cart.html");
    }*/































