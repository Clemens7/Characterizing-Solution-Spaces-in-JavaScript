import {calculatePrice} from "./frame.js"

if (window.localStorage.getItem('cart') === null)  else {
    console.log("cookie was set");
    var country = document.getElementById("country");

    addCountry()
    calulateSubtotal()
    addShippingCostAndTotalCost()
}

async function addCountry() {
    fetch('https://web-engineering.big.tuwien.ac.at/s20/a2/shipping')
        .then(response => {
            return response.json()
        })
        .then(data => {
            // Work with JSON data here
            for (let i = 0; i < data['destinations'].length; i++) {
                var option = document.createElement('Option');
                option.setAttribute('value', data['destinations'][i].country);
                option.appendChild(document.createTextNode((data['destinations'][i].displayName)));
                option.nodeValue = i;
                document.getElementById("country").appendChild(option);
            }
        })
        .catch()
}

async function calulateSubtotal() {
    let subtotal = 0;
    var cartTotal = document.getElementsByClassName("cart-total").length;
    console.log(cartTotal)
    let data = JSON.parse(window.localStorage.getItem('cart'));
    data.forEach(element => {
        subtotal -= -calculatePrice(element.printSize, element.frameStyle, element.frameWidth, element.matWidth)
    });
    document.getElementById('price-subtotal').innerHTML = subtotal.toFixed(2);
}

async function addShippingCostAndTotalCost() {
    var request = new XMLHttpRequest()

    request.open('GET', 'https://web-engineering.big.tuwien.ac.at/s20/a2/shipping', true)
    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)

        if (request.status >= 200 && request.status < 400) {
            // Work with JSON data here
            document.getElementById('price-shipping').innerHTML = ((data['destinations'][0].cost) / 100).toFixed(2);
            document.getElementById('price-total').innerHTML = (document.getElementById('price-subtotal').innerHTML - -(data['destinations'][0].cost) / 100).toFixed(2);
            //console.log("Shipping Costs: " + ((data['destinations'][0].cost)/100).toFixed(2))
            country.addEventListener("change", function () {
                console.log("Country set: " + country.value)
                for (let i = 0; i < data['destinations'].length; i++) {
                    if (country.value === '' + (data['destinations'][i].country)) {
                        console.log("Shipping Cost: " + ((data['destinations'][i].cost) / 100).toFixed(2))
                        document.getElementById('price-shipping').textContent = ((data['destinations'][i].cost) / 100).toFixed(2);
                        return document.getElementById('price-total').innerHTML = (document.getElementById('price-subtotal').innerHTML - -(data['destinations'][i].cost) / 100).toFixed(2);
                    }
                }});
        }
    };
    request.send()
}



  




  



  


  











