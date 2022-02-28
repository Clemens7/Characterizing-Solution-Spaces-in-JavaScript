import StorageHandler from './storage-handler.js';
import {getPrintSizes, calculatePrice, render} from "./frame.js";
import {} from "./config.js";
import {API} from "./api.js";
let IDs = [];

window.onload = function() {
    console.log("cart loaded");
    showItemsDynamically();
    enableCheckout();
    getIDs();
    displayAll(IDs).then(() => {
        renderFrames();
        addCancel();
        displayTotal();
    });



};



async function displayAll(IDs) {
    const cart = document.getElementById("cart");
    if (IDs.length === 0) 

    for (let i = 0; i < IDs.length; i++) {
        cart.prepend(await dynamicItems(i))
    }
}
function fetchItem(objectID) {
    const cachedItem = StorageHandler.getItemFromCache(objectID);
    if (cachedItem) 
    return fetch(API.OBJECTS + objectID)
        .then(res => res.json())
        .then(data => {
            StorageHandler.addToCache(data);
            return data;
        });
}
async function dynamicItems(itemID) {
    const structure = document.createElement("div");

    if (itemID !== "empty") {
        const itemHelp = IDs[itemID];
        const item = await fetchItem(itemHelp["objectID"]);
        let x = "img-" + itemID;
        let y = "container-" + itemID;
        let z = "items-" + itemID;
        structure.setAttribute('id', z);
        structure.setAttribute('class', 'cart-item');

        let prize = calculatePrice(itemHelp["printSize"], itemHelp["frameStyle"], itemHelp["frameWidth"], itemHelp["matWidth"]);
        prize = Math.round((prize + Number.EPSILON) * 100) / 100;
        prize = prize.toFixed(2);
        let size = "Small";

        if (itemHelp["printSize"] === "M") {
            size = "Medium";
        } else if (itemHelp["printSize"] === "L") {
            size = "Large";
        }
        let description = size + " print in a " + (itemHelp["frameWidth"] / 10) + " cm " + itemHelp["frameStyle"] + " frame";

        if (itemHelp["matWidth"] == 0)  else {
            description += " with a " + (itemHelp["matWidth"] / 10) + " cm " + itemHelp["matColor"] + " mat.";
        }
        structure.innerHTML = `    
        <div class="cart-preview" id=${y}>
          <a href="config.html?objectID=${itemHelp["objectID"]}&printSize=${itemHelp["printSize"]}&frameStyle=${itemHelp["frameStyle"]}&frameWidth=${itemHelp["frameWidth"]}&matColor=${itemHelp["matColor"]}&matWidth=${itemHelp["matWidth"]}">
            <img class="cart-thumb" src=${item["primaryImageSmall"]} id=${x} alt="">
          </a>
        </div>
        <div class="museum-label">
          <div>
            <span class="artist">${item["artistDisplayName"]}</span>
            <span class="title">${item["title"]}</span>,
            <span class="date">${item["objectDate"]}</span>
            <br><br>
            <span class="frame-description">${description}</span>
          </div>
          <div class="cart-price">€ <span id="price-0">${prize}</span></div>
          <button class="cart-remove" type="button" id=${itemID}></button>
        </div>
      </div>`;
    }


    return structure;

}

export function showItemsDynamically() {
    const cart = document.getElementById("cart-link");

    cart.innerText = "Cart (" + StorageHandler.getCartSize() + ")";

    return cart;
}



function enableCheckout() {
    const button = document.getElementById("checkout-button");
    button.disabled = false;
}

function displayTotal() {
    const price_total = document.getElementById("price-total");
    let total = 0;
    for (let i = 0; i < IDs.length; i++) {
        const itemHelp = StorageHandler.readCart()[i];
        total +=calculatePrice(itemHelp["printSize"], itemHelp["frameStyle"], itemHelp["frameWidth"], itemHelp["matWidth"]);
        total = Math.round((total + Number.EPSILON) * 100)/100;
    }
    let help = total.toString().split(".");
    if (help[1] !== undefined && help[1].length < 2)  else {
        price_total.innerHTML =`${total}`;
    }
    return price_total;
}

function renderFrames() {
    for (let i = 0; i < IDs.length; i++) {
        let item = IDs[i];
        const container = document.getElementById("container-" + i);
        const img = document.getElementById("img-" + i);
        img.addEventListener("load", event => {
            render(img, container, item["printSize"], item["frameStyle"], item["frameWidth"], item["matColor"], item["matWidth"]);
        });
    }
}


function getIDs() {
    IDs = StorageHandler.readCart();
}

async function addCancel() {
    const cancel = [];
        for (let i = 0; i < IDs.length; i++) {
            cancel[i] = document.getElementById(i.toString());
            cancel[i].addEventListener("click", );
        }
}
