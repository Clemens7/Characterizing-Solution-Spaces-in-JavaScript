import { calculatePrice } from "./frame.js";

window.addEventListener('load', function(e) {
    setSum();
    loadShipping();

})

let cart = JSON.parse(localStorage.getItem("cart"));
if (!cart) 


function getSum() {
    let sum = 0;
    let i;
    let cart = JSON.parse(localStorage.getItem("cart"));
    for (i = 0; i < cart.length; i++) {
        let item = cart[i];
        sum += calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth)
    }
    return sum;
}

function setSum() {
    let sum = getSum();
    document.getElementById('price-subtotal').innerText = sum.toLocaleString(
        undefined,
        { minimumFractionDigits: 2 }
      );
}


async function loadShipping() {
    await fetch("https://web-engineering.big.tuwien.ac.at/s20/a2/shipping").then(
        (response) => {
            return response.json();
        }
    ).then(
        result => {
            let select = document.getElementById('country');
            result.destinations.forEach(land => {
                select.options[select.options.length] = new Option(land.displayName);
            });
            document.getElementById('country').addEventListener('change', function(e) {
                calculateShipping();
            });
            let ev = document.createEvent('Event');
            ev.initEvent('change', true, false);
            select.dispatchEvent(ev);
        }
    );
    
}



async function calculateShipping() {
    await fetch("https://web-engineering.big.tuwien.ac.at/s20/a2/shipping").then(
        (response) => {
            return response.json();
        }
    ).then(
        result => {
            let select = document.getElementById('country');
            result.destinations.forEach(land => {
                if (select.options[select.selectedIndex].value === land.displayName) {
                    document.getElementById('price-shipping').innerText = (land.cost / 100).toLocaleString(
                        undefined,
                        {minimumFractionDigits: 2}
                    );
                    document.getElementById('price-total').innerText = (land.cost / 100 + getSum()).toLocaleString(
                        undefined,
                        {minimumFractionDigits: 2}
                    );
                }
                
            });
        }
    );
}
