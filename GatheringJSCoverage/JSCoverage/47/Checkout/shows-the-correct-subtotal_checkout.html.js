
        import {calculatePrice, render} from "./frame.js";

        const cartLink = document.getElementById("cart-link");
        const countryShip = document.getElementById("country");
        //var options = countryShip.querySelectorAll("option");


        //subtotal muss sich den wert vom cart.html holen
        let subtotal =  0;
        let cart = localStorage.getItem('cart');
        let countryOptionFirst;



        //es soll redirecten aber tut es nicht
        // if (subtotal <= 0 || subtotal === NaN || subtotal == "NaN"){
        //     location.replace('cart.html');
        // }


        document.addEventListener('DOMContentLoaded', async event => {
            const cart = localStorage.getItem('cart');
            const currentCart = JSON.parse(localStorage.getItem('cart'));
            if(!currentCart)
                


            for(let object of currentCart){
                subtotal += parseFloat(calculatePrice(object.printSize, object.frameStyle, object.frameWidth, object.matWidth));
            }
            document.getElementById("price-subtotal").innerText = subtotal.toFixed(2);


            for (var ii = 0; ii < 10 ; ii++){

                if (ii == 0){
                    countryOptionFirst = await getDestination(ii);
                    var sel = document.getElementById('country');
                    var opt = document.createElement('option');
                    opt.appendChild(document.createTextNode(countryOptionFirst[0]));
                    opt.value = countryOptionFirst[2];
                    sel.appendChild(opt);
                    document.getElementById("price-shipping").innerText = (parseFloat(countryOptionFirst[1])/100).toFixed(2);
                    document.getElementById("price-total").innerText = await (parseFloat(document.getElementById("price-shipping").innerText) + subtotal).toFixed(2);
                }else {
                    var countryATM = await getDestination(ii);
                }
            }});






        


        //document.getElementById('price-total').innerText=subtotal;
        //const cartTotal = parseFloat(document.getElementById("price-total").innerText);
        //console.log(cartTotal);


        class Destinations {
            
        }


        /* var request = new XMLHttpRequest()

        request.open('GET', 'https://web-engineering.big.tuwien.ac.at/s20/a2/shipping', true)
        request.onload = function() {
            // Begin accessing JSON data here
            var destinations = JSON.parse(this.response);
            console.log(destinations);
            return destinations;
        }
        request.send();
    */









        // countryShip.addEventListener('click', function () {
        //  document.getElementById("price-shipping").innerHTML =getRightShippingCost("");
        //})

        countryShip.addEventListener('change', )




        async function getDestination(num){
            const response = await fetch('https://web-engineering.big.tuwien.ac.at/s20/a2/shipping');
            const rawData = await response.json();
            const button = document. querySelector('button');
            var arr = new Array();
            button.disabled = false;
            try {
                arr.push(rawData.destinations[num].displayName);
                arr. push(rawData.destinations[num].cost);
                arr. push(rawData.destinations[num].country);
                console.log(arr);
                return arr;
            }}


        //get cost of specific place
        

        


        //   <option value="Austria">Austria</option>
        //<option value="Germany">Germany</option>
          //  <option value="Switzerland">Switzerland</option>
            //<option value="USA">USA</option>

    