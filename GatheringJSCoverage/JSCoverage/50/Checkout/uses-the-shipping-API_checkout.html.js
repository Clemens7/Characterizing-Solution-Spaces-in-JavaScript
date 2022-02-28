

    import{calculatePrice} from './frame.js';

    let destinations;

    document.addEventListener('DOMContentLoaded', event =>{
        document.getElementById('pay-button').disabled = true;
        getDestinations();
    });

    function setCountries(){
        for(let destination of destinations){
          let selectCountry = document.getElementById('country');
          let opt = document.createElement('option');
          opt.appendChild(document.createTextNode(destination.displayName));
          opt.value = destination.country;
          selectCountry.appendChild(opt);
        }
    }

    function setShippingPrice() {
        let selectCountry = document.getElementById('country');
        let country = selectCountry.options[selectCountry.selectedIndex].value;
        if(country) {
            let shippingCost = destinations.find(d => d.country === country).cost;
            document.getElementById('price-shipping').innerText = (parseFloat(shippingCost) / 100).toFixed(2);
        }
        calcTotal();
    }

    function getDestinations() {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                destinations = JSON.parse(this.responseText).destinations;
                setCountries();
                setShippingPrice();
                calcTotal();
                document.getElementById('pay-button').disabled = false;
            }
        };

        xhttp.onerror = ;

        xhttp.open("GET", "https://web-engineering.big.tuwien.ac.at/s20/a2/shipping", true);
        xhttp.send();
    }

    function calcTotal(){
        let cart = JSON.parse(window.localStorage.getItem('cart'));
        if(!cart || cart.length === 0)
        let total = 0.00;
        for(let item of cart){
            total += calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
        }
        document.getElementById('price-subtotal').innerText = total.toFixed(2);
        total += parseFloat(document.getElementById('price-shipping').innerText);
        if(!isNaN(total))
            document.getElementById('price-total').innerText = total.toFixed(2);
    }

    document.getElementById('country').addEventListener('change', setShippingPrice);
  