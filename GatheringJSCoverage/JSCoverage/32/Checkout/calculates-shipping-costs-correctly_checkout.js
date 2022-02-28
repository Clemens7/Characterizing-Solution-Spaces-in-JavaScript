import {calculatePrice} from "./frame.js";

document.addEventListener("DOMContentLoaded", () => {
    if(window.localStorage.getItem('cart') == null) else {
        //console.log(window.localStorage.getItem('cart'));
        document.getElementById("pay-button").disabled = true;
    }
})

window.onload = async function () {
    let x;
    let request = new XMLHttpRequest();
    request.open("GET", "https://web-engineering.big.tuwien.ac.at/s20/a2/shipping");
    request.onload = async function() {
        let data = JSON.parse(this.response);
        await setupSubtotal();
        await setupCountrySelect(data);
        x = data;
    }
    request.send();
    const div = document.getElementsByTagName("div")[1];
    div.addEventListener("change", event => {
        event.preventDefault();
        console.log(x);
        updatePrice(x);
    });
}

async function calculateSubTotalPrice(){
    let cart = await JSON.parse(localStorage.getItem('cart'));
    let subtotal = 0;
    for (let art of cart) {
        let x = calculatePrice(art.printSize, art.frameStyle, art.frameWidth, art.matWidth);
        subtotal += x;
    }
    return subtotal;
}

async function setupSubtotal() {
    let subtotal = (await calculateSubTotalPrice());
    let obj = document.getElementById("price-subtotal");
    obj.innerText = subtotal.toFixed(2);
}

async function setupCountrySelect(data) {
    let select = document.getElementById("country");
    for (let destination of data.destinations) {
        let option = document.createElement("option");
        option.text = destination.displayName;
        option.value = destination.country;
        select.add(option);
    }
}

async function updatePrice(data) {
    const subtotal = await calculateSubTotalPrice();
    const selectedCountry = document.getElementById("country");
    let selected = selectedCountry.options[selectedCountry.selectedIndex].value;
    console.log("selected: " + selected);
    for (let code of data.destinations) {
        if (selected == code.country) {
            let cost = (code.cost);
            document.getElementById("price-shipping").innerText = (cost/100).toFixed(2);
            document.getElementById("price-shipping").value = code.country;
            document.getElementById("price-total").innerText = ((cost/100) + subtotal).toFixed(2);
            document.getElementById("pay-button").disabled = false;
            document.getElementById("pay-button").onclick = ;
        }
    }
}