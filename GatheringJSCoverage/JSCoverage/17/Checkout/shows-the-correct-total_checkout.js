import * as Frame from "./frame.js";
import { readCart } from "./cart-model.js";

function calculateTotal(shipping, subtotal) {
    let scost = shipping.cost / 100.0;
    document.getElementById("price-shipping").innerText = scost.toFixed(2);
    document.getElementById("price-total").innerText = (subtotal + scost).toFixed(2);
}

export async function calculatePrice() {
    if (readCart().length === 0) 

    let subtotal = 0;
    readCart().map(p => subtotal += Frame.calculatePrice(p.printSize, p.frameStyle, p.frameWidth, p.matWidth));
    document.getElementById("price-subtotal").innerText = subtotal.toFixed(2);

    fetch("https://web-engineering.big.tuwien.ac.at/s20/a2/shipping").then(response => response.json()).then(result => {
        let dropdown = document.getElementById("country");
        for (let dest of result.destinations) {
            let option = document.createElement("option");
            option.value = dest.country
            option.text = dest.displayName;
            dropdown.appendChild(option);
        }
        dropdown.addEventListener("change", () => calculateTotal(result.destinations[dropdown.selectedIndex], subtotal));
        calculateTotal(result.destinations[dropdown.selectedIndex], subtotal);
    }).catch();
}
