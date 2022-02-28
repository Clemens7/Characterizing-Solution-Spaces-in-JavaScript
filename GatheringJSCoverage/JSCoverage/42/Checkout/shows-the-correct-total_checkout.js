import * as frame from './frame.js'
var value = 0;
var dataCountry = {}
document.getElementById("country").onchange=update_cost;
document.addEventListener('DOMContentLoaded', event => {
if(!("cart" in localStorage))else if(JSON.parse(localStorage["cart"]).length==0)
else{
    calc_subTot()
    get_shipping_count()
  
}
})


async function calc_subTot(){

       var cart = get_fromLoc();
       var sub_tot=0;
      for (let ind = 0; ind < cart.length; ind++) {
         
        await add(frame.calculatePrice(cart[ind].printSize,cart[ind].frameStyle,cart[ind].frameWidth,cart[ind].matWidth))
      }
        
      
       
   
 
   document.getElementById("price-subtotal").innerHTML=value.toFixed(2)
  
   
  

}

function add(num){
    value+=num;
}

async function get_shipping_count(){
    document.getElementById("pay-button").disabled=true;
    const url = "https://web-engineering.big.tuwien.ac.at/s20/a2/shipping"
    const response = await fetch(url);
    const rawdata = await response.json();
    const data = await rawdata.destinations;
    dataCountry=data
    let optionsList = document.getElementById("country").options;

    data.forEach(element => {
        optionsList.add(
            new Option(element.displayName, element.country, false)
            )
    });
    optionsList[0].selected=true
    update_cost()
    document.getElementById("pay-button").disabled=false;
    

}

function update_cost(){
    var option = getPriceFromCode(document.getElementById("country").value)
    option=parseFloat(option)
    option=option/100;
    var tot_cost = option+value
    
    document.getElementById("price-shipping").innerHTML=option.toFixed(2);
    document.getElementById("price-total").innerHTML=tot_cost.toFixed(2);
}



function get_fromLoc(){
    const key = "cart";
    if(key in localStorage){
        return JSON.parse(localStorage[key]);
    }
}

function getPriceFromCode(code){
    for (var i=0; i < dataCountry.length; i++) {
        if (dataCountry[i].country == code) {
            return dataCountry[i].cost;
        }
    }
}